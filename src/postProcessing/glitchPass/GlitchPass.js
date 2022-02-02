import {
	DataTexture,
	FloatType,
	MathUtils,
	RGBFormat,
	ShaderMaterial,
	UniformsUtils
} from 'three/build/three.module.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { DigitalGlitch } from '../../shaders/glitch/DigitalGlitch';

var GlitchPass = function ( dt_size = 8 ) {

    Pass.call( this );

    if ( DigitalGlitch === undefined ) console.error( "GlitchPass relies on DigitalGlitch" );

    var shader = DigitalGlitch;
    this.uniforms = UniformsUtils.clone( shader.uniforms );

    if ( dt_size == undefined ) dt_size ;

    this.uniforms[ "tDisp" ].value = this.generateHeightmap( dt_size );
    this.uniforms["amount"].value = 0
    this.uniforms['uTime'].value = 0
    this.uniforms[ 'angle' ].value = 0
    this.uniforms[ 'seed_x' ].value = MathUtils.randFloat( 0, 1 );
    this.uniforms[ 'seed_y' ].value = 0;
    this.uniforms[ 'distortion_x' ].value = MathUtils.randFloat( 0, 0.3 );
    this.uniforms[ 'distortion_y' ].value = MathUtils.randFloat( 0, 0 );


    this.material = new ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    } );

    this.fsQuad = new Pass.FullScreenQuad( this.material );

    this.goWild = false;
    this.curF = 0.01;
    this.generateTrigger();

};

GlitchPass.prototype = Object.assign( Object.create( Pass.prototype ), {

    constructor: GlitchPass,

    render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

        this.uniforms[ "tDiffuse" ].value = readBuffer.texture;
        this.uniforms[ 'seed' ].value = MathUtils.randFloat( - 0.8, 0.8 );//default seeding
        this.uniforms[ 'byp' ].value = 0;

        // if ( this.curF % this.randX == 0 || this.goWild == true ) {
            // this.uniforms[ 'amount' ].value = 0;
            //MathUtils.randFloat( - Math.PI, Math.PI );
            
            this.curF = 0;
            this.generateTrigger();

        if ( this.renderToScreen ) {

            renderer.setRenderTarget( null );
            this.fsQuad.render( renderer );

        } else {

            renderer.setRenderTarget( writeBuffer );
            if ( this.clear ) renderer.clear();
            this.fsQuad.render( renderer );

        }

    },

    generateTrigger: function () {

        this.randX = MathUtils.randInt( 120, 240 );

    },

    generateHeightmap: function ( dt_size ) {

        var data_arr = new Float32Array( dt_size * dt_size * 3 );
        var length = dt_size * dt_size;

        for ( var i = 0; i < length; i ++ ) {

            var val = MathUtils.randFloat( 0, 0.4 ); //STRENGH VALUE
            data_arr[ i * 3 + 0 ] = val;
            data_arr[ i * 3 + 1 ] = val;
            data_arr[ i * 3 + 2 ] = val;

        }

        return new DataTexture( data_arr, dt_size, dt_size, RGBFormat, FloatType );

    }

} );

export { GlitchPass };
