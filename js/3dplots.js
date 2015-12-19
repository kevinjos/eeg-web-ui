var ndarray = require('./build/node_modules/ndarray');
var createScene = require('./build/node_modules/gl-plot3d');
var createSurfacePlot = require('./build/node_modules/gl-surface3d');

window.fftsize = 50;
var timesize = 30;
var varmap = {};

makescene = function(i) {

	varmap['scene'+i] = createScene({'canvas': document.getElementById('fft' + i + 'canvas'),
                            'autoResize':false,
                            'autoScale':false,
                            'autoCenter':false,
                            'autoBounds':true,
                            'camera':{ eye:    [0.5, 0.0, 1.5],
                                 center: [0.5, 0.0, 0.0],
                                 up:     [0.0, 1.0, 0.0]}
                            });
	varmap['fft'+i] = ndarray(new Float32Array(window.fftsize*timesize), [window.fftsize,timesize]);
	varmap['surface'+i] = createSurfacePlot({
		gl:    varmap['scene'+i].gl,
		field: varmap['fft'+i]
	});
	varmap['scene'+i].add(varmap['surface'+i]);
	window['scene'+i] = varmap['scene'+1];
	window['surface'+i] = varmap['surface'+i];
	window['fft'+i] = varmap['fft'+i];
}

for(var i=1; i<9; i++) {
	makescene(i);
}

updatenewsize = function(fftsize) {
	fftsize /= 2;
	for(var chan=1; chan<9; chan++) {
		window['fft'+chan] = ndarray(new Float32Array(fftsize*timesize), [fftsize, timesize])
	}
}

