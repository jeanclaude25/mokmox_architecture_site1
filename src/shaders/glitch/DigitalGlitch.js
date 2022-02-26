/**
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */
 import * as THREE from 'three'
 import vertexGlitch  from './vertex.glsl';
 import fragmentGlitch from './fragment.glsl';

 var DigitalGlitch = {

	uniforms: {

		'tDiffuse': { value: null }, //diffuse texture
		'tDisp': { value: null }, //displacement texture for digital glitch squares
		'byp': { value: 0 }, //apply the glitch ?
		'amount': { value: 0 },
		'angle': { value: 0.7 },
		'seed': { value: 0.85 },
		'seed_x': { value: -0.25 }, //-1,1
		'seed_y': { value: 0.25 }, //-1,1
		'distortion_x': { value: 0.46 },
		'distortion_y': { value: 0.39 },
		'col_s': { value: 0.01 },
		'uTime':{value:0},
		'uMultiplier':{value:29},

		'uResolution':{value:new THREE.Vector2(60,60)},
		'uTimeNoise':{value:0},
        'uFrequency':{value: 1}
	},

	vertexShader: vertexGlitch,
	fragmentShader: fragmentGlitch

};

export { DigitalGlitch };
