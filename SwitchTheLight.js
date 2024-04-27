(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.被子4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AjlGoQDglODJhoQDJhqB6hYQB7hZE9g6AL/iMQGrAPAohsQB5lHwMhlQwMhllFD8AzeFqQGYFFF5AEQCfACA2geQBGgSCSjoQCPjpCVgyQCUgyDHiD");
	this.shape.setTransform(127.9824,69.1363);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3358B8").s().p("Am8KzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlh5FHQgoBsmsgPIigBZQjHCDiUAyQiUAyiQDpQiRDohGASQgzAciPAAIgTAAgAIYjQQh7BYjJBqQjJBojfFOQDflODJhoQDJhqB7hYQB6hZE+g6Qk+A6h6BZg");
	this.shape_1.setTransform(126.3293,69.1363);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,253.7,140.3);


(lib.被子2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Ax0GGQFCBqGJC0QCaAYAuhIIBki8QETmGDsiBQBZgyDnAyIDPCSQCPA3A4g3QCcjbquloQojjsuXBeAlSI0QAGiOCPjXQEKmVGYhJQEJgSC/DF");
	this.shape.setTransform(116.0443,68.1828);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3358B8").s().p("AmfKkQmKi0lBhqQhepMFenIQOXheIiDsQKvFoicDbQg4A3iQg3IjPiSQjmgyhZAyQjsCBkTGGIhlC8QgiA2heAAQggAAgngGgAHukPQmXBJkLGVQiPDXgGCOQAGiOCPjXQELmVGXhJIArgCIAAAAIABAAQDqAACtCvIAGAGIgGgGQitivjqAAIgBAAIAAAAIgrACIAAAAg");
	this.shape_1.setTransform(115.0576,68.1828);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,231.2,138.4);


(lib.枕头 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Aq4AYQAmEWHKAmQHChmG1j6QBEjBmAh/Qp4g8mzGggApOACQEDAqCDC3");
	this.shape.setTransform(69.6929,34.0226);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3358B8").s().p("Aq4AYQGzmgJ4A8QGAB/hEDBQm1D6nCBmQnKgmgmkWgAjIDjQiDi3kDgqQEDAqCDC3g");
	this.shape_1.setTransform(69.6929,34.0226);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,141.4,70.1);


(lib.人 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AhJj1QAjgKAmAAQBqAABLBLQBLBLAABpQAABqhLBLQhLBLhqAAQhpAAhLhLQhLhLAAhqQAAhpBLhLQArgrA1gSAhRgbIg5A8AAfhnIBCg1");
	this.shape.setTransform(25.55,25.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai0C0QhLhKAAhqQAAhpBLhLQArgrA2gSIAKAAIAAgEQAjgKAmAAQBqAABKBLQBMBLAABpQAABqhMBKQhKBMhqAAQhpAAhLhMgAiKAgIA5g7gAAfhnIBCg1g");
	this.shape_1.setTransform(25.55,25.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.人, new cjs.Rectangle(-1,-1,53.1,53.1), null);


(lib.补间16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AlQCnIGbiQQIvkip5CaIlCBu");
	this.shape.setTransform(-0.004,0.0237);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.7,-17.7,69.4,35.5);


(lib.补间15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Ak0D5IGbiQQG+p2oIHuIlCBt");
	this.shape.setTransform(0.0108,-0.006);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.9,-25.9,63.8,51.8);


(lib.补间14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AkxERIGbiRQGzrVn9JOIlCBs");
	this.shape.setTransform(0.0175,-0.0106);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.6,-28.2,63.3,56.5);


(lib.补间13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AFnh2QAoAbg2AXAGsh8QAyA+hQAZAm+CwIJEjkQEPigkSAwIoyCo");
	this.shape.setTransform(0.0115,0.0198);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.7,-18.5,91.4,37.1);


(lib.补间12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("Am+CwIJEjkQEQigkTAwIoyCoAFnh2QAoAbg2AXAGsh8QAyA+hQAZ");
	this.shape.setTransform(0.013,0.0165);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.7,-18.5,91.4,37.1);


(lib.补间3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AgQhUIhRgTABqgYIBPAeACwi6QAaAZATAiQA1BcgbBlQgcBmhbA1QhcA1hlgcQhmgbg1hbQg1hcAbhmQAbhlBcg1QBcg1BlAbQA7APAqAm");
	this.shape.setTransform(0.025,0.0033);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhBD2Qhmgbg1hbQg1hcAbhmQAbhlBcg1QBcg1BlAbQA7APAqAmIAGAJIADgCQAaAZATAiQA1BcgbBlQgcBmhbA1Qg8AjhBAAQghAAgjgKgAC5AGIhPgegAgQhUIhRgTg");
	this.shape_1.setTransform(0.025,0.0033);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.6,-26.6,53.3,53.2);


(lib.补间1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("ABGJCQAAAdgVAUQgNAOgRAFQgJACgKAAQgbAAgVgVQgUgUAAgdQAAgcAUgVQAFgEAFgEQARgMAVAAQAdAAAUAUQAVAVAAAcgABsJFQAAAsggAgQgVAVgbAHQgNAEgPAAQgsAAggggQgfggAAgsQAAgtAfggQAIgHAIgFQAagTAiAAQAsAAAgAfQAgAgAAAtgAgCqwIAASD");
	this.shape.setTransform(1.6,-0.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhLBMQgggfAAgtQAAgrAgghIAPgMQAagTAiAAQAtAAAfAfQAgAhAAArQAAAtggAfQgVAVgbAHQgNAEgPAAQgsAAgfgggAgmg7IgJAJQgVAUAAAcQAAAcAVAVQAUAUAbAAQAKAAAJgCQARgEAOgOQAUgVAAgcQAAgcgUgUQgVgVgdAAQgUAAgSAMg");
	this.shape_1.setTransform(1.6,57.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.2,-70.6,23.6,139.8);


(lib.元件1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AhJj1QAjgKAmAAQBqAABLBLQBLBLAABpQAABqhLBLQhLBLhqAAQhpAAhLhLQhLhLAAhqQAAhpBLhLQArgrA1gSAAfhnIBCg1AhRgbIg5A8");
	this.shape.setTransform(25.55,25.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai0C0QhLhKAAhqQAAhpBLhLQArgrA2gSIAKAAIAAgEQAjgKAmAAQBqAABKBLQBMBLAABpQAABqhMBKQhKBMhqAAQhpAAhLhMgAiKAgIA5g7gAAfhnIBCg1g");
	this.shape_1.setTransform(25.55,25.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(-1,-1,53.1,53.1), null);


(lib.拉环交互 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(9.2,69.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,23.6,139.8);


// stage content:
(lib.SwitchTheLight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,29,30,54,59,179];
	this.streamSoundSymbolsList[30] = [{id:"_113636__edgardedition__click6wav",startFrame:30,endFrame:34,loop:1,offset:0}];
	this.streamSoundSymbolsList[54] = [{id:"_89534__cgeffex__veryfastbubblepop1",startFrame:54,endFrame:59,loop:1,offset:0}];
	this.streamSoundSymbolsList[59] = [{id:"_172359__avakas__gettingupfrombedwav",startFrame:59,endFrame:179,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_29 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.button_4.on('click', function(){
		/*
		播放影片剪辑/视频或当前时间轴。
		播放指定的影片剪辑或视频。
		*/
		_this.play();
		});
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_30 = function() {
		var soundInstance = playSound("_113636__edgardedition__click6wav",0);
		this.InsertIntoSoundStreamData(soundInstance,30,34,1);
	}
	this.frame_54 = function() {
		var soundInstance = playSound("_89534__cgeffex__veryfastbubblepop1",0);
		this.InsertIntoSoundStreamData(soundInstance,54,59,1);
	}
	this.frame_59 = function() {
		var soundInstance = playSound("_172359__avakas__gettingupfrombedwav",0);
		this.InsertIntoSoundStreamData(soundInstance,59,179,1);
	}
	this.frame_179 = function() {
		playSound("_113636__edgardedition__click6wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(29).call(this.frame_29).wait(1).call(this.frame_30).wait(24).call(this.frame_54).wait(5).call(this.frame_59).wait(120).call(this.frame_179).wait(51));

	// RingSwitch
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("ABGJCQAAAdgVAUQgNAOgRAFQgIACgKAAQgcAAgVgVQgUgUAAgdQAAgcAUgVQAFgEAFgEQARgMAWAAQAcAAAUAUQAVAVAAAcgABsJFQAAAsggAgQgVAVgbAHQgNAEgPAAQgrAAghggQgfggAAgsQAAgtAfggQAIgHAIgFQAbgTAhAAQAsAAAgAfQAgAgAAAtgAgCqwIAASD");
	this.shape.setTransform(310.55,59.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhLBMQgggfAAgtQAAgsAggfIAPgNQAbgTAhAAQAtAAAfAgQAgAfAAAsQAAAtggAfQgVAWgbAHQgNADgPAAQgsAAgfgggAglg7IgKAIQgVAVAAAdQAAAbAVAUQAUAVAbAAQALAAAIgCQARgFAOgOQAUgUAAgbQAAgdgUgVQgVgUgdAAQgVAAgQAMg");
	this.shape_1.setTransform(310.55,117.5);

	this.button_4 = new lib.拉环交互();
	this.button_4.name = "button_4";
	this.button_4.setTransform(310.55,59.45,1,1,0,0,0,10.8,68.9);
	new cjs.ButtonHelper(this.button_4, 0, 1, 1);

	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(308.95,69.75);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.button_4}]},29).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},140).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance}]},5).wait(41));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(34).to({_off:false},0).wait(5).to({y:65.25},0).wait(140).to({startPosition:0},0).to({y:69.75},5).to({y:65.25},5).wait(41));

	// Bubble
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("ABOglQAEA0gWBDQgDAHgBAFQgVAxgVgtQgGgPgIgNQgRgcgTgLQgdgQgJggQgJggARgdQARgdAggJQAfgIAdARQAdAQAGA2g");
	this.shape_2.setTransform(162.3458,152.3298);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,204,255,0.627)").s().p("AAOBiQgGgPgIgNQgRgcgTgLQgdgQgJggQgJggARgdQARgdAggJQAfgIAdARQAdAQAGA2QAEA0gWBDIgEAMQgLAagLAAQgKAAgKgWg");
	this.shape_3.setTransform(162.3458,152.3298);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AhNgQQgJgiARgeQASgfAhgIQAhgJAeARQAdARAHA5QAEA2gXBFQgaBAgVgvQgHgQgIgNQgSgdgUgMQgegRgJggg");
	this.shape_4.setTransform(162.1333,151.855);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,204,255,0.627)").s().p("AAPBnQgHgQgIgNQgSgdgUgMQgegRgJggQgJgiARgeQASgfAhgIQAhgJAeARQAdARAHA5QAEA2gXBFQgPAlgNAAQgKAAgJgUg");
	this.shape_5.setTransform(162.1333,151.855);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,1).p("AhQgRQgJgjASgeQASggAjgJQAhgKAgATQAeARAHA7QAFA4gYBIQgbBCgXgxQgHgQgIgOQgTgegUgMQgfgSgKgig");
	this.shape_6.setTransform(161.8958,151.4955);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,204,255,0.627)").s().p("AAPBrQgHgQgIgOQgTgegUgMQgfgSgKgiQgJgjASgeQASggAjgJQAhgKAgATQAeARAHA7QAFA4gYBIQgQAmgOAAQgKAAgKgVg");
	this.shape_7.setTransform(161.8958,151.4955);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("AhTgRQgKglATggQATghAkgJQAjgKAgATQAgASAHA9QAFA6gZBLQgcBEgXgyQgHgRgJgOQgTgfgWgNQgggSgKgjg");
	this.shape_8.setTransform(161.6833,151.126);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,204,255,0.627)").s().p("AAQBvQgHgRgJgOQgTgfgWgNQgggSgKgjQgKglATggQATghAkgJQAjgKAgATQAgASAHA9QAFA6gZBLQgQAngPAAQgKAAgKgVg");
	this.shape_9.setTransform(161.6833,151.126);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,1,1).p("AhWgSQgKgmAUghQATgiAlgKQAkgKAiAUQAhATAHA/QAFA8gaBNQgdBHgYg0QgHgSgJgOQgUghgWgNQgigTgKgkg");
	this.shape_10.setTransform(161.4737,150.762);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(0,204,255,0.627)").s().p("AAQBzQgHgSgJgOQgUghgWgNQgigTgKgkQgKgmAUghQATgiAlgKQAkgKAiAUQAhATAHA/QAFA8gaBNQgRApgPAAQgLAAgKgWg");
	this.shape_11.setTransform(161.4737,150.762);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,1,1).p("AhZgTQgKgnAUgiQATgjAngKQAmgKAiAUQAiATAHBBQAGA/gbBQQgdBJgZg2QgIgTgJgPQgVghgXgNQgjgUgKgmg");
	this.shape_12.setTransform(161.2556,150.4314);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(0,204,255,0.627)").s().p("AARB3QgIgTgJgPQgVghgXgNQgjgUgKgmQgKgnAUgiQATgjAngKQAmgKAiAUQAiATAHBBQAGA/gbBQQgRAqgPAAQgLAAgLgXg");
	this.shape_13.setTransform(161.2556,150.4314);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,1,1).p("AhcgUQgKgoAVgjQAUgkAogLQAmgKAkAVQAjATAIBEQAFBAgbBTQgfBLgag4QgIgTgJgPQgWgjgXgNQgkgVgLgng");
	this.shape_14.setTransform(161.0345,150.0674);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(0,204,255,0.627)").s().p("AARB6QgIgTgJgPQgWgjgXgNQgkgVgLgnQgKgoAVgjQAUgkAogLQAmgKAkAVQAjATAIBEQAFBAgbBTQgSArgQAAQgMAAgLgYg");
	this.shape_15.setTransform(161.0345,150.0674);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,1,1).p("AhfgUQgLgqAWgkQAVgmApgKQAogLAlAVQAkAVAIBFQAFBDgcBVQgfBOgbg6QgJgTgJgQQgXgkgYgOQglgVgLgog");
	this.shape_16.setTransform(160.8222,149.7134);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(0,204,255,0.627)").s().p("AASB+QgJgTgJgQQgXgkgYgOQglgVgLgoQgLgqAWgkQAVgmApgKQAogLAlAVQAkAVAIBFQAFBDgcBVQgSAtgQAAQgNAAgLgZg");
	this.shape_17.setTransform(160.8222,149.7134);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,1,1).p("AhigVQgLgqAWgmQAWgmArgMQApgLAmAXQAlAUAIBIQAGBFgdBYQghBQgbg7QgJgVgKgQQgXglgZgOQgmgWgMgqg");
	this.shape_18.setTransform(160.5931,149.3466);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,204,255,0.627)").s().p("AATCDQgJgVgKgQQgXglgZgOQgmgWgMgqQgLgqAWgmQAWgmArgMQApgLAmAXQAlAUAIBIQAGBFgdBYQgTAugRAAQgNAAgLgZg");
	this.shape_19.setTransform(160.5931,149.3466);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(1,1,1).p("AhlgVQgLgsAXgnQAWgoAsgLQAqgMAnAXQAnAWAIBKQAGBGgeBbQgiBSgcg9QgJgVgKgQQgYgmgZgPQgogXgMgqg");
	this.shape_20.setTransform(160.3833,148.9798);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(0,204,255,0.627)").s().p("AATCGQgJgVgKgQQgYgmgZgPQgogXgMgqQgLgsAXgnQAWgoAsgLQAqgMAnAXQAnAWAIBKQAGBGgeBbQgUAvgRAAQgNAAgMgag");
	this.shape_21.setTransform(160.3833,148.9798);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(1,1,1).p("AhogWQgMgtAYgoQAXgpAtgMQArgMApAYQAnAWAJBMQAGBJgfBdQgiBVgeg/QgJgVgKgSQgZgngagPQgogXgNgsg");
	this.shape_22.setTransform(160.1667,148.6287);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(0,204,255,0.627)").s().p("AATCKQgJgVgKgSQgZgngagPQgogXgNgsQgMgtAYgoQAXgpAtgMQArgMApAYQAnAWAJBMQAGBJgfBdQgUAxgSAAQgNAAgNgbg");
	this.shape_23.setTransform(160.1667,148.6287);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(1,1,1).p("AhrgXQgMguAYgpQAYgqAugMQAtgNApAZQApAXAJBNQAGBLggBgQgjBXgehAQgKgWgKgSQgagogbgQQgpgXgNgug");
	this.shape_24.setTransform(159.9569,148.2619);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(0,204,255,0.627)").s().p("AAUCOQgKgWgKgSQgagogbgQQgpgXgNguQgMguAYgpQAYgqAugMQAtgNApAZQApAXAJBNQAGBLggBgQgUAygTAAQgNAAgNgbg");
	this.shape_25.setTransform(159.9569,148.2619);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(1,1,1).p("AhugXQgMgwAZgqQAYgrAwgNQAugMAqAZQAqAXAJBQQAHBNghBjQglBZgehCQgKgXgLgSQgagpgcgQQgqgYgOgvg");
	this.shape_26.setTransform(159.7279,147.8951);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(0,204,255,0.627)").s().p("AAVCSQgKgXgLgSQgagpgcgQQgqgYgOgvQgMgwAZgqQAYgrAwgNQAugMAqAZQAqAXAJBQQAHBNghBjQgVAzgTAAQgOAAgNgcg");
	this.shape_27.setTransform(159.7279,147.8951);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,1,1).p("AhxgYQgNgxAagrQAZgsAxgNQAvgNAsAaQArAYAJBSQAHBPgiBlQglBcgghEQgKgXgLgTQgbgqgcgRQgsgZgOgwg");
	this.shape_28.setTransform(159.5153,147.5411);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(0,204,255,0.627)").s().p("AAVCWQgKgXgLgTQgbgqgcgRQgsgZgOgwQgNgxAagrQAZgsAxgNQAvgNAsAaQArAYAJBSQAHBPgiBlQgVA1gUAAQgOAAgOgdg");
	this.shape_29.setTransform(159.5153,147.5411);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(1,1,1).p("Ah0gZQgNgyAbgsQAZgtAzgOQAwgNAtAbQAsAYAJBUQAHBRgjBoQgmBegghFQgKgYgMgTQgbgsgegRQgsgZgPgyg");
	this.shape_30.setTransform(159.2944,147.1771);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(0,204,255,0.627)").s().p("AAWCaQgKgYgMgTQgbgsgegRQgsgZgPgyQgNgyAbgsQAZgtAzgOQAwgNAtAbQAsAYAJBUQAHBRgjBoQgWA2gUAAQgPAAgNgdg");
	this.shape_31.setTransform(159.2944,147.1771);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(1,1,1).p("Ah3gZQgNg0AbgtQAagvA0gNQAxgOAuAbQAtAZAKBXQAHBTgjBrQgnBggihHQgKgZgMgUQgcgsgegRQgugbgPgyg");
	this.shape_32.setTransform(159.0765,146.8465);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(0,204,255,0.627)").s().p("AAWCeQgKgZgMgUQgcgsgegRQgugbgPgyQgNg0AbgtQAagvA0gNQAxgOAuAbQAtAZAKBXQAHBTgjBrQgXA3gUAAQgQAAgOgeg");
	this.shape_33.setTransform(159.0765,146.8465);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(1,1,1).p("Ah6gaQgNg1AbguQAbgwA1gOQAzgOAvAcQAuAaAKBYQAHBWgkBtQgoBjgihKQgLgZgMgUQgdgugfgRQgvgbgPg0g");
	this.shape_34.setTransform(158.8667,146.4825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(0,204,255,0.627)").s().p("AAXChQgLgZgMgUQgdgugfgRQgvgbgPg0QgNg1AbguQAbgwA1gOQAzgOAvAcQAuAaAKBYQAHBWgkBtQgXA4gVAAQgQAAgOgfg");
	this.shape_35.setTransform(158.8667,146.4825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(1,1,1).p("Ah9gbQgOg2AcgvQAcgxA2gPQA0gOAwAdQAwAaAKBbQAHBXglBwQgpBlgjhLQgLgagMgUQgegvgfgSQgxgcgPg1g");
	this.shape_36.setTransform(158.6542,146.1129);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(0,204,255,0.627)").s().p("AAXClQgLgagMgUQgegvgfgSQgxgcgPg1QgOg2AcgvQAcgxA2gPQA0gOAwAdQAwAaAKBbQAHBXglBwQgYA6gVAAQgQAAgPggg");
	this.shape_37.setTransform(158.6542,146.1129);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(1,1,1).p("AiAgcQgOg3AdgwQAcgyA4gPQA1gPAxAeQAxAaAKBdQAIBagmByQgqBogkhNQgLgagNgVQgegwghgTQgxgcgQg3g");
	this.shape_38.setTransform(158.4167,145.7535);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(0,204,255,0.627)").s().p("AAYCpQgLgagNgVQgegwghgTQgxgcgQg3QgOg3AdgwQAcgyA4gPQA1gPAxAeQAxAaAKBdQAIBagmByQgYA8gWAAQgRAAgPghg");
	this.shape_39.setTransform(158.4167,145.7535);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(1,1,1).p("ACHhBQAIBcgnB1QgFAMgCAIQgkBWglhPQgLgbgNgVQgfgxghgTQgzgdgQg4QgOg4AdgyQAdgzA5gPQA2gPAzAeQAxAbALBfg");
	this.shape_40.setTransform(158.2042,145.598);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(0,204,255,0.627)").s().p("AAYCrQgLgbgNgVQgfgxghgTQgzgdgQg4QgOg4AdgyQAdgzA5gPQA2gPAzAeQAxAbALBfQAIBcgnB1IgHAUQgTAsgTAAQgRAAgSglg");
	this.shape_41.setTransform(158.2042,145.598);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(1,1,1).p("AiAgbQgOg4AdgwQAcgyA3gPQA2gPAxAeQAxAbAKBdQAIBZgmBzQgqBngkhNQgLgagNgVQgegwghgTQgxgcgQg2g");
	this.shape_42.setTransform(158.4029,145.7285);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(0,204,255,0.635)").s().p("AAYCpQgLgagNgVQgegwghgTQgxgcgQg2QgOg4AdgwQAcgyA3gPQA2gPAxAeQAxAbAKBdQAIBZgmBzQgYA7gWAAQgRAAgPghg");
	this.shape_43.setTransform(158.4029,145.7285);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(1,1,1).p("Ah9gbQgOg2AcgvQAcgxA2gPQA0gOAxAdQAvAaAKBbQAIBXgmBwQgpBmgjhLQgLgagMgVQgegvgfgSQgxgcgPg1g");
	this.shape_44.setTransform(158.6292,146.0768);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(0,204,255,0.643)").s().p("AAXCmQgLgagMgVQgegvgfgSQgxgcgPg1QgOg2AcgvQAcgxA2gPQA0gOAxAdQAvAaAKBbQAIBXgmBwQgXA7gWAAQgQAAgPggg");
	this.shape_45.setTransform(158.6292,146.0768);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(1,1,1).p("Ah6gaQgOg1AcguQAbgxA1gOQAzgOAvAcQAvAaAJBZQAIBWglBtQgoBjgihJQgLgZgMgVQgdgtgfgSQgvgbgPg0g");
	this.shape_46.setTransform(158.8167,146.4075);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(0,204,255,0.655)").s().p("AAXCiQgLgZgMgVQgdgtgfgSQgvgbgPg0QgOg1AcguQAbgxA1gOQAzgOAvAcQAvAaAJBZQAIBWglBtQgXA5gVAAQgPAAgPgfg");
	this.shape_47.setTransform(158.8167,146.4075);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(1,1,1).p("Ah3gaQgOgzAbguQAbgvA0gNQAxgOAvAbQAtAZAKBXQAHBUgkBrQgnBhgihIQgKgZgMgTQgcgtgegRQgvgbgOgzg");
	this.shape_48.setTransform(159.0326,146.7558);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(0,204,255,0.663)").s().p("AAWCeQgKgZgMgTQgcgtgegRQgvgbgOgzQgOgzAbguQAbgvA0gNQAxgOAvAbQAtAZAKBXQAHBUgkBrQgXA4gUAAQgQAAgOgfg");
	this.shape_49.setTransform(159.0326,146.7558);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(1,1,1).p("Ah0gZQgNgzAagsQAaguAygNQAxgOAtAbQAsAZAKBVQAHBRgjBpQgmBfghhHQgKgYgMgTQgbgsgegRQgtgagOgxg");
	this.shape_50.setTransform(159.2451,147.1016);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(0,204,255,0.671)").s().p("AAWCaQgKgYgMgTQgbgsgegRQgtgagOgxQgNgzAagsQAaguAygNQAxgOAtAbQAsAZAKBVQAHBRgjBpQgWA3gUAAQgPAAgOgfg");
	this.shape_51.setTransform(159.2451,147.1016);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(1,1,1).p("AhxgYQgNgxAagsQAYgsAygOQAwgNAsAbQArAYAJBSQAHBQgiBmQgmBdgfhFQgKgXgMgTQgbgrgdgRQgsgZgNgwg");
	this.shape_52.setTransform(159.4431,147.4433);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(0,204,255,0.678)").s().p("AAWCXQgKgXgMgTQgbgrgdgRQgsgZgNgwQgNgxAagsQAYgsAygOQAwgNAsAbQArAYAJBSQAHBQgiBmQgWA1gUAAQgOAAgNgdg");
	this.shape_53.setTransform(159.4431,147.4433);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(1,1,1).p("AhvgYQgMgwAZgqQAYgsAxgMQAugNArAZQAqAYAJBRQAHBNghBkQglBagfhDQgKgXgLgSQgagqgcgQQgrgYgOgwg");
	this.shape_54.setTransform(159.6479,147.7806);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(0,204,255,0.686)").s().p("AAVCTQgKgXgLgSQgagqgcgQQgrgYgOgwQgMgwAZgqQAYgsAxgMQAugNArAZQAqAYAJBRQAHBNghBkQgVA0gUAAQgOAAgNgdg");
	this.shape_55.setTransform(159.6479,147.7806);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(1,1,1).p("AhsgXQgMgvAYgpQAYgrAvgMQAtgNAqAZQApAXAJBPQAGBMggBhQgkBYgehBQgJgXgLgSQgagogbgQQgqgYgNgug");
	this.shape_56.setTransform(159.8576,148.1224);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(0,204,255,0.698)").s().p("AAUCQQgJgXgLgSQgagogbgQQgqgYgNguQgMgvAYgpQAYgrAvgMQAtgNAqAZQApAXAJBPQAGBMggBhQgUAygTAAQgOAAgNgbg");
	this.shape_57.setTransform(159.8576,148.1224);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(1,1,1).p("AhpgXQgMgtAYgoQAXgqAugMQAsgMApAYQAoAWAIBNQAGBKgfBeQgjBWgdg/QgKgWgKgSQgZgngbgPQgpgYgMgtg");
	this.shape_58.setTransform(160.073,148.4624);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(0,204,255,0.706)").s().p("AAUCMQgKgWgKgSQgZgngbgPQgpgYgMgtQgMgtAYgoQAXgqAugMQAsgMApAYQAoAWAIBNQAGBKgfBeQgUAygSAAQgOAAgMgbg");
	this.shape_59.setTransform(160.073,148.4624);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(1,1,1).p("AhmgWQgMgsAXgnQAXgpAtgMQAqgLAoAXQAnAWAIBLQAHBHgfBcQgiBUgdg+QgJgVgKgRQgYgngagPQgogWgMgsg");
	this.shape_60.setTransform(160.2897,148.8153);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(0,204,255,0.714)").s().p("AATCIQgJgVgKgRQgYgngagPQgogWgMgsQgMgsAXgnQAXgpAtgMQAqgLAoAXQAnAWAIBLQAHBHgfBcQgUAwgRAAQgOAAgMgag");
	this.shape_61.setTransform(160.2897,148.8153);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(1,1,1).p("AhkgVQgLgrAXgmQAWgoArgLQAqgLAmAWQAmAWAIBIQAHBGgeBaQghBRgcg8QgJgVgKgQQgXgmgagPQgmgWgNgqg");
	this.shape_62.setTransform(160.4773,149.146);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(0,204,255,0.722)").s().p("AATCFQgJgVgKgQQgXgmgagPQgmgWgNgqQgLgrAXgmQAWgoArgLQAqgLAmAWQAmAWAIBIQAHBGgeBaQgTAugSAAQgMAAgMgZg");
	this.shape_63.setTransform(160.4773,149.146);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(1,1,1).p("AhhgUQgLgrAWgkQAWgnAqgLQAogLAmAWQAlAVAIBHQAGBDgeBXQgfBPgcg6QgIgUgKgQQgXglgYgOQgmgVgMgpg");
	this.shape_64.setTransform(160.6924,149.4861);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(0,204,255,0.729)").s().p("AASCBQgIgUgKgQQgXglgYgOQgmgVgMgpQgLgrAWgkQAWgnAqgLQAogLAmAWQAlAVAIBHQAGBDgeBXQgSAugRAAQgMAAgMgZg");
	this.shape_65.setTransform(160.6924,149.4861);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(1,1,1).p("AhegUQgLgpAVgkQAVglApgLQAngKAlAVQAkAUAHBFQAGBCgcBUQgfBNgbg5QgIgTgJgQQgXgjgXgOQglgVgLgog");
	this.shape_66.setTransform(160.9022,149.8278);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(0,204,255,0.741)").s().p("AARB9QgIgTgJgQQgXgjgXgOQglgVgLgoQgLgpAVgkQAVglApgLQAngKAlAVQAkAUAHBFQAGBCgcBUQgSAsgQAAQgMAAgMgYg");
	this.shape_67.setTransform(160.9022,149.8278);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(1,1,1).p("AhcgTQgKgoAVgjQAUgkAogKQAmgLAjAVQAjATAIBDQAFBAgbBSQgeBKgag3QgIgTgJgPQgWgigXgNQgjgVgMgmg");
	this.shape_68.setTransform(161.1069,150.1651);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(0,204,255,0.749)").s().p("AARB5QgIgTgJgPQgWgigXgNQgjgVgMgmQgKgoAVgjQAUgkAogKQAmgLAjAVQAjATAIBDQAFBAgbBSQgRArgQAAQgMAAgLgYg");
	this.shape_69.setTransform(161.1069,150.1651);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").ss(1,1,1).p("AhZgTQgKgmAVgiQATgjAngKQAlgKAiAUQAiATAHBAQAFA+gaBQQgeBIgYg1QgIgTgJgOQgVgigWgNQgjgTgLgmg");
	this.shape_70.setTransform(161.3083,150.5191);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(0,204,255,0.757)").s().p("AARB2QgIgTgJgOQgVgigWgNQgjgTgLgmQgKgmAVgiQATgjAngKQAlgKAiAUQAiATAHBAQAFA+gaBQQgRAqgPAAQgMAAgKgXg");
	this.shape_71.setTransform(161.3083,150.5191);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(1,1,1).p("AhWgSQgJgmATggQATgiAlgKQAkgKAhAUQAhASAHA/QAFA8gaBNQgcBGgYg0QgHgSgJgOQgUgggWgNQghgTgLgkg");
	this.shape_72.setTransform(161.5174,150.8526);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(0,204,255,0.765)").s().p("AAQByQgHgSgJgOQgUgggWgNQghgTgLgkQgJgmATggQATgiAlgKQAkgKAhAUQAhASAHA/QAFA8gaBNQgQAogOAAQgLAAgLgWg");
	this.shape_73.setTransform(161.5174,150.8526);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(1,1,1).p("AhTgSQgJgkATggQASggAkgKQAjgJAgATQAfARAHA9QAFA6gZBKQgbBEgXgyQgIgRgIgOQgTgfgWgMQgggTgKgjg");
	this.shape_74.setTransform(161.7333,151.201);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(0,204,255,0.773)").s().p("AAQBuQgIgRgIgOQgTgfgWgMQgggTgKgjQgJgkATggQASggAkgKQAjgJAgATQAfARAHA9QAFA6gZBKQgQAogOAAQgLAAgJgWg");
	this.shape_75.setTransform(161.7333,151.201);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(1,1,1).p("AhQgRQgJgjASgeQASggAjgJQAhgJAfASQAfARAGA7QAFA4gYBIQgaBBgXgwQgHgRgIgNQgTgegUgMQgfgSgKgig");
	this.shape_76.setTransform(161.9208,151.5317);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(0,204,255,0.784)").s().p("AAPBrQgHgRgIgNQgTgegUgMQgfgSgKgiQgJgjASgeQASggAjgJQAhgJAfASQAfARAGA7QAFA4gYBIQgPAlgOAAQgKAAgKgUg");
	this.shape_77.setTransform(161.9208,151.5317);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(1,1,1).p("AhNgQQgJgiASgeQARgeAigJQAggJAeASQAdAQAHA5QAEA2gXBFQgaBAgVgvQgHgQgIgNQgSgdgUgLQgegSgJggg");
	this.shape_78.setTransform(162.1472,151.88);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(0,204,255,0.792)").s().p("AAPBnQgHgQgIgNQgSgdgUgLQgegSgJggQgJgiASgeQARgeAigJQAggJAeASQAdAQAHA5QAEA2gXBFQgPAlgOAAQgJAAgJgUg");
	this.shape_79.setTransform(162.1472,151.88);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(0,204,255,0.8)").s().p("AAOBiQgGgPgIgNQgRgcgTgLQgdgQgJggQgJggARgdQARgdAggJQAfgIAdARQAdAQAGA2QAEA0gWBDIgEAMQgLAagLAAQgKAAgKgWg");
	this.shape_80.setTransform(162.3458,152.3298);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").ss(1,1,1).p("AhNgQQgJgiASgeQAQgdAhgJQAigKAeASQAdAQAHA4QAEA3gXBFQgZA+gVgsQgIgRgIgMQgSgegTgLQgfgSgJgfg");
	this.shape_81.setTransform(162.1472,151.8668);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(0,204,255,0.8)").s().p("AAQBoQgIgRgIgMQgSgegTgLQgfgSgJgfIAAgBQgJgiASgeQAQgdAhgJQAigKAeASQAdAQAHA4QAEA3gXBFQgPAlgNAAQgKAAgIgTg");
	this.shape_82.setTransform(162.1472,151.8668);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#000000").ss(1,1,1).p("AhQgRQgJgiASgfQASgfAhgKQAjgJAfASQAeARAHA6QAFA4gYBIQgaBBgWguQgIgSgIgMQgSgfgUgLQgggTgKghg");
	this.shape_83.setTransform(161.9319,151.5256);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(0,204,255,0.8)").s().p("AAQBsQgIgSgIgMQgSgfgUgLQgggTgKghIAAgBQgJgiASgfQASgfAhgKQAjgJAfASQAeARAHA6QAFA4gYBIQgPAmgOAAQgKAAgJgTg");
	this.shape_84.setTransform(161.9319,151.5256);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(1,1,1).p("AhTgRQgJgkATggQASggAigKQAlgKAgATQAfASAHA8QAFA6gZBKQgbBDgXgvQgIgSgIgOQgTgfgVgMQghgTgKgjg");
	this.shape_85.setTransform(161.7333,151.1757);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("rgba(0,204,255,0.8)").s().p("AAQBwQgIgSgIgOQgTgfgVgMQghgTgKgjIAAAAQgJgkATggQASggAigKQAlgKAgATQAfASAHA8QAFA6gZBKQgQAngOAAQgLAAgJgTg");
	this.shape_86.setTransform(161.7333,151.1757);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#000000").ss(1,1,1).p("AhWgSQgJglATghQATghAkgKQAmgKAgATQAhATAHA9QAFA9gaBMQgcBFgXgxQgJgSgIgOQgUghgVgMQgigUgLgjg");
	this.shape_87.setTransform(161.5104,150.8107);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("rgba(0,204,255,0.8)").s().p("AARBzQgJgSgIgOQgUghgVgMQgigUgLgjIAAgBQgJglATghQATghAkgKQAmgKAgATQAhATAHA9QAFA9gaBMQgQAogPAAQgLAAgJgUg");
	this.shape_88.setTransform(161.5104,150.8107);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#000000").ss(1,1,1).p("AhZgSQgKgnAVgiQATgiAlgKQAngLAiAUQAhATAIBAQAFA/gaBPQgeBGgYgyQgIgTgJgOQgVgigWgNQgjgUgLglg");
	this.shape_89.setTransform(161.3014,150.4695);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("rgba(0,204,255,0.8)").s().p("AARB3QgIgTgJgOQgVgigWgNQgjgUgLglIAAAAQgKgnAVgiQATgiAlgKQAngLAiAUQAhATAIBAQAFA/gaBPQgSApgPAAQgLAAgKgVg");
	this.shape_90.setTransform(161.3014,150.4695);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(1,1,1).p("AhbgTQgLgnAVgjQAUgkAngLQAogKAiAVQAjATAIBCQAFBBgbBRQgfBIgYgzQgJgUgJgPQgWgigWgNQgkgVgLgmg");
	this.shape_91.setTransform(161.1141,150.1195);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("rgba(0,204,255,0.8)").s().p("AASB7QgJgUgJgPQgWgigWgNQgkgVgLgmIAAgBQgLgnAVgjQAUgkAngLQAogKAiAVQAjATAIBCQAFBBgbBRQgSAqgQAAQgLAAgKgVg");
	this.shape_92.setTransform(161.1141,150.1195);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(1,1,1).p("AhegTQgKgpAVgkQAVglAogLQApgLAjAWQAkAUAIBEQAFBCgcBUQggBKgYg1QgKgUgJgPQgWgkgXgNQglgWgMgng");
	this.shape_93.setTransform(160.8979,149.7698);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("rgba(0,204,255,0.8)").s().p("AATB+QgKgUgJgPQgWgkgXgNQglgWgMgnIAAAAQgKgpAVgkQAVglAogLQApgLAjAWQAkAUAIBEQAFBCgcBUQgTArgQAAQgLAAgKgWg");
	this.shape_94.setTransform(160.8979,149.7698);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(1,1,1).p("AhhgUQgLgqAWglQAWgmApgLQAqgLAlAWQAlAUAIBHQAFBEgcBWQghBMgag2QgJgVgKgPQgXglgYgOQgmgWgMgpg");
	this.shape_95.setTransform(160.6862,149.4243);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("rgba(0,204,255,0.8)").s().p("AATCCQgJgVgKgPQgXglgYgOQgmgWgMgpIAAAAQgLgqAWglQAWgmApgLQAqgLAlAWQAlAUAIBHQAFBEgcBWQgUAtgRAAQgMAAgKgXg");
	this.shape_96.setTransform(160.6862,149.4243);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(1,1,1).p("AhkgVQgLgrAXgmQAWgnAqgLQAsgLAmAWQAlAVAIBIQAGBHgdBZQgiBNgbg3QgJgWgKgPQgXgmgZgPQgogXgMgpg");
	this.shape_97.setTransform(160.4701,149.0747);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("rgba(0,204,255,0.8)").s().p("AATCGQgJgWgKgPQgXgmgZgPQgogXgMgpIAAgBQgLgrAXgmQAWgnAqgLQAsgLAmAWQAlAVAIBIQAGBHgdBZQgUAtgRAAQgNAAgLgXg");
	this.shape_98.setTransform(160.4701,149.0747);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(1,1,1).p("AhmgVQgMgsAXgnQAXgpAsgMQAsgLAnAXQAnAWAIBKQAGBJgeBbQgjBQgbg6QgKgWgKgQQgYgngagOQgogYgMgrg");
	this.shape_99.setTransform(160.2826,148.7243);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("rgba(0,204,255,0.8)").s().p("AAUCJQgKgWgKgQQgYgngagOQgogYgMgrIAAAAQgMgsAXgnQAXgpAsgMQAsgLAnAXQAnAWAIBKQAGBJgeBbQgVAugRAAQgNAAgLgYg");
	this.shape_100.setTransform(160.2826,148.7243);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(1,1,1).p("AhpgWQgMgtAYgoQAXgqAtgMQAugLAoAXQAnAWAJBNQAGBLgfBdQgkBSgcg7QgKgXgKgQQgZgogagPQgqgYgMgsg");
	this.shape_101.setTransform(160.0736,148.3833);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("rgba(0,204,255,0.8)").s().p("AAUCNQgKgXgKgQQgZgogagPQgqgYgMgsIAAgBQgMgtAYgoQAXgqAtgMQAugLAoAXQAnAWAJBNQAGBLgfBdQgVAwgSAAQgNAAgMgZg");
	this.shape_102.setTransform(160.0736,148.3833);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#000000").ss(1,1,1).p("AhsgWQgMgvAYgpQAYgqAvgNQAvgMAoAYQApAXAJBPQAGBMggBgQglBUgcg8QgLgYgKgQQgagpgbgQQgqgZgNgtg");
	this.shape_103.setTransform(159.8507,148.0181);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("rgba(0,204,255,0.8)").s().p("AAVCRQgLgYgKgQQgagpgbgQQgqgZgNgtIAAAAQgMgvAYgpQAYgqAvgNQAvgMAoAYQApAXAJBPQAGBMggBgQgVAxgTAAQgNAAgMgZg");
	this.shape_104.setTransform(159.8507,148.0181);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#000000").ss(1,1,1).p("AhvgXQgMgwAZgqQAYgrAwgNQAwgMAqAYQAqAYAJBRQAGBOghBjQgmBVgdg+QgLgXgKgSQgbgqgbgQQgsgZgNgvg");
	this.shape_105.setTransform(159.6522,147.6686);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("rgba(0,204,255,0.8)").s().p("AAVCUQgLgXgKgSQgbgqgbgQQgsgZgNgvQgMgwAZgqQAYgrAwgNQAwgMAqAYQAqAYAJBRQAGBOghBjQgWAxgTAAQgOAAgMgag");
	this.shape_106.setTransform(159.6522,147.6686);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#000000").ss(1,1,1).p("AhxgXQgNgxAagrQAZgtAxgOQAxgMArAaQArAYAJBSQAGBRghBlQgoBXgdg/QgLgYgLgSQgbgrgcgQQgtgagNgwg");
	this.shape_107.setTransform(159.4368,147.3266);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("rgba(0,204,255,0.8)").s().p("AAWCYQgLgYgLgSQgbgrgcgQQgtgagNgwQgNgxAagrQAZgtAxgOQAxgMArAaQArAYAJBSQAGBRghBlQgXAzgUAAQgOAAgMgbg");
	this.shape_108.setTransform(159.4368,147.3266);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("rgba(0,204,255,0.8)").s().p("AAWCaQgKgYgMgTQgbgsgegRQgtgagOgxQgNgzAagsQAaguAygNQAxgOAtAbQAsAZAKBVQAHBRgjBpQgWA3gUAAQgPAAgOgfg");
	this.shape_109.setTransform(159.2451,147.1016);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(1,1,1).p("AgLBJQArgNAugiQAIgGAIgHQAGgFADgCQAngkgxgEQgRgBgPgDQgggGgRgOQgZgWgiAEQghADgVAaQgVAaADAgQAEAhAaAVQAMALATACQAUACAbgHg");
	this.shape_110.setTransform(196.027,202.942);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("rgba(0,204,255,0.627)").s().p("Ag6BOQgTgCgMgLQgagVgEghQgDggAVgaQAVgaAhgDQAigEAZAWQARAOAgAGQAPADARABQAxAEgnAkIgJAHIgQANQguAigrANQgVAFgRAAIgJAAg");
	this.shape_111.setTransform(196.027,202.942);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(1,1,1).p("Ah7AJQgDghAXgbQAWgZAjgDQAjgCAZAXQARAOAhAIQARAEAPABQAyAHgoAiQgFAFgEADQgLAIgGAEQgxAigsAMQgdAGgUgCQgUgDgMgLQgagXgDghg");
	this.shape_112.setTransform(195.6716,202.6475);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(0,204,255,0.627)").s().p("Ag+BQQgUgDgMgLQgagXgDghIAAgBQgDghAXgbQAWgZAjgDQAjgCAZAXQARAOAhAIQARAEAPABQAyAHgoAiIgJAIIgRAMQgxAigsAMQgVAEgQAAIgMAAg");
	this.shape_113.setTransform(195.6716,202.6475);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(1,1,1).p("Ah/AHQgCgiAZgbQAXgaAkgCQAkgBAZAZQASAPAhAJQARAEAQACQAzAJgqAiQgFAEgFADQgKAIgIAFQgzAiguAKQgeAGgUgEQgVgDgMgMQgagYgCgig");
	this.shape_114.setTransform(195.3191,202.3138);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("rgba(0,204,255,0.627)").s().p("AhCBRQgVgDgMgMQgagYgCgiIAAgBQgCgiAZgbQAXgaAkgCQAkgBAZAZQASAPAhAJQARAEAQACQAzAJgqAiIgKAHIgSANQgzAiguAKQgSAEgPAAIgRgCg");
	this.shape_115.setTransform(195.3191,202.3138);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(1,1,1).p("AiDAFQgBgkAagaQAZgaAlgBQAlgBAZAaQASARAiAKQARAEARADQA1AKgsAiQgGAFgFADQgLAIgIAEQg1AigxAJQgeAFgWgEQgVgEgMgMQgagagBgjg");
	this.shape_116.setTransform(194.9975,202.0134);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("rgba(0,204,255,0.627)").s().p("AhHBTQgVgEgMgMQgagagBgjIAAgBQgBgkAagaQAZgaAlgBQAlgBAZAaQASARAiAKQARAEARADQA1AKgsAiIgLAIIgTAMQg1AigxAJQgRADgOAAQgLAAgKgCg");
	this.shape_117.setTransform(194.9975,202.0134);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(1,1,1).p("AiIADQAAglAcgbQAagaAmAAQAnAAAZAcQASARAiAMQASAFARADQA3AMgvAiQgGAEgFADQgLAIgJAEQg4AigyAIQggAFgVgFQgWgEgMgOQgbgbAAgkg");
	this.shape_118.setTransform(194.6651,201.7125);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("rgba(0,204,255,0.627)").s().p("AhLBVQgWgEgMgOQgbgbAAgkIAAgBQAAglAcgbQAagaAmAAQAnAAAZAcQASARAiAMQASAFARADQA3AMgvAiIgLAHIgUAMQg4AigyAIQgQADgNAAQgNAAgLgDg");
	this.shape_119.setTransform(194.6651,201.7125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(1,1,1).p("AiMABQABgmAdgbQAcgaAnABQAoABAZAdQASATAjAMQASAGARADQA5AOgwAiQgHAEgFADQgMAIgJAEQg7Ahg0AIQggAEgXgFQgWgGgMgOQgbgcABgmg");
	this.shape_120.setTransform(194.3019,201.3966);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("rgba(0,204,255,0.627)").s().p("AhQBYQgWgGgMgOQgbgcABgmIAAgBQABgmAdgbQAcgaAnABQAoABAZAdQASATAjAMQASAGARADQA5AOgwAiIgMAHIgVAMQg7Ahg0AIIgZABQgQAAgOgCg");
	this.shape_121.setTransform(194.3019,201.3966);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(1,1,1).p("AiQAAQACgoAegbQAdgbAoACQApADAaAeQASATAkAOQASAGASAEQA6APgyAiQgHAFgFADQgNAHgJAFQg+Ahg1AGQgiADgXgGQgXgGgMgOQgbgeACgng");
	this.shape_122.setTransform(193.9755,201.093);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("rgba(0,204,255,0.627)").s().p("AhUBZQgXgGgMgOQgbgeACgnIAAAAQACgoAegbQAdgbAoACQApADAaAeQASATAkAOQASAGASAEQA6APgyAiIgMAIIgWAMQg+Ahg1AGIgWABQgUAAgPgEg");
	this.shape_123.setTransform(193.9755,201.093);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(1,1,1).p("AiUgCQACgpAggbQAfgbApADQAqADAaAgQASAUAlAPQATAHASAEQA8AQg1AjQgHAEgFADQgOAIgJAEQhAAhg4AFQgjADgXgHQgYgGgMgQQgbgfADgng");
	this.shape_124.setTransform(193.635,200.7947);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("rgba(0,204,255,0.627)").s().p("AhYBbQgYgGgMgQQgbgfADgnIAAgBQACgpAggbQAfgbApADQAqADAaAgQASAUAlAPQATAHASAEQA8AQg1AjIgMAHIgXAMQhAAhg4AFIgTABQgXAAgQgFg");
	this.shape_125.setTransform(193.635,200.7947);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(1,1,1).p("AiZgEQAEgqAigcQAggbAqAEQAqAEAbAiQASAUAmARQATAHASAFQA+ARg2AjQgIAFgFADQgPAHgKAFQhCAgg6AEQgkACgYgHQgXgHgNgQQgbghADgog");
	this.shape_126.setTransform(193.2676,200.4771);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("rgba(0,204,255,0.627)").s().p("AhdBdQgXgHgNgQQgbghADgoIAAgBQAEgqAigcQAggbAqAEQAqAEAbAiQASAUAmARQATAHASAFQA+ARg2AjIgNAIIgZAMQhCAgg6AEIgPABQgaAAgTgGg");
	this.shape_127.setTransform(193.2676,200.4771);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(1,1,1).p("AidgGQAFgsAjgbQAhgbAsAEQArAFAcAjQASAWAmARQATAIATAFQA/AUg4AjQgIAEgGADQgOAIgLAEQhFAgg8AEQgkABgZgIQgYgIgNgRQgbgiAEgpg");
	this.shape_128.setTransform(192.9235,200.1984);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("rgba(0,204,255,0.627)").s().p("AhhBfQgYgIgNgRQgbgiAEgpIAAgBQAFgsAjgbQAhgbAsAEQArAFAcAjQASAWAmARQATAIATAFQA/AUg4AjIgOAHIgZAMQhFAgg8AEIgIAAQgfAAgWgHg");
	this.shape_129.setTransform(192.9235,200.1984);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(1,1,1).p("AihgIQAGgtAkgcQAjgbAsAFQAtAGAcAlQASAWAnATQATAIAUAGQBBAVg7AjQgIAEgGADQgPAIgLAEQhIAgg9ACQgmABgZgJQgZgIgNgRQgbgkAFgrg");
	this.shape_130.setTransform(192.5897,199.9092);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("rgba(0,204,255,0.627)").s().p("AhlBgQgZgIgNgRQgbgkAFgrIAAAAQAGgtAkgcQAjgbAsAFQAtAGAcAlQASAWAnATQATAIAUAGQBBAVg7AjIgOAHIgaAMQhIAgg9ACIgIABQghAAgWgJg");
	this.shape_131.setTransform(192.5897,199.9092);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(1,1,1).p("AilgKQAGguAmgcQAlgbAtAGQAuAHAcAmQASAXAoAUQATAJAUAGQBDAXg8AjQgJAEgGADQgQAHgLAFQhLAfg/ACQgnAAgagJQgZgKgNgRQgcgmAHgsg");
	this.shape_132.setTransform(192.2117,199.5975);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("rgba(0,204,255,0.627)").s().p("AhqBjQgZgKgNgRQgcgmAHgsIAAAAQAGguAmgcQAlgbAtAGQAuAHAcAmQASAXAoAUQATAJAUAGQBDAXg8AjIgPAHIgbAMQhLAfg/ACIgEAAQgkAAgZgJg");
	this.shape_133.setTransform(192.2117,199.5975);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(1,1,1).p("AipgNQAHgvAogcQAlgbAvAHQAvAIAcAnQASAZApAUQAUAKAUAGQBEAZg+AjQgJAEgGADQgRAHgLAFQhOAfhBABQgogBgagKQgagKgNgSQgcgnAIgtg");
	this.shape_134.setTransform(191.8617,199.329);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("rgba(0,204,255,0.627)").s().p("AhuBkQgagKgNgSQgcgnAIgtIAAgBQAHgvAogcQAlgbAvAHQAvAIAcAnQASAZApAUQAUAKAUAGQBEAZg+AjIgPAHIgcAMQhOAfhBABQgogBgagKg");
	this.shape_135.setTransform(191.8617,199.329);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(1,1,1).p("AitgPQAJgwApgcQAngcAvAIQAxAJAcApQASAZApAWQAUAKAVAGQBGAbhAAjQgJAEgHADQgRAIgMAEQhQAfhDAAQgpgBgbgLQgagLgNgTQgcgoAIgug");
	this.shape_136.setTransform(191.4907,199.0196);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("rgba(0,204,255,0.627)").s().p("AhyBmQgagLgNgTQgcgoAIguIAAgBQAJgwApgcQAngcAvAIQAxAJAcApQASAZApAWQAUAKAVAGQBGAbhAAjIgQAHIgdAMQhQAfhDAAQgpgBgbgLg");
	this.shape_137.setTransform(191.4907,199.0196);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(1,1,1).p("AixgRQAJgyArgbQAogcAxAIQAyAKAcAqQASAbAqAXQAVALAUAGQBIAdhCAjQgJAEgHADQgSAHgMAFQhTAehFgBQgqgCgbgLQgbgLgNgUQgcgqAJgvg");
	this.shape_138.setTransform(191.1385,198.7276);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("rgba(0,204,255,0.627)").s().p("AgxB1QgqgCgbgLQgbgLgNgUQgcgqAJgvIAAgBQAJgyArgbQAogcAxAIQAyAKAcAqQASAbAqAXQAVALAUAGQBIAdhCAjIgQAHIgeAMQhQAdhDAAIgFAAg");
	this.shape_139.setTransform(191.1385,198.7276);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(1,1,1).p("Ai1gTQAKgzAsgcQAqgcAyAJQAzALAcAsQASAbArAZQAVAKAVAIQBKAehFAjQgJAEgHADQgTAHgNAFQhVAehGgCQgrgDgcgMQgcgMgNgUQgdgrALgxg");
	this.shape_140.setTransform(190.7876,198.4609);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("rgba(0,204,255,0.627)").s().p("AgzB4QgrgDgcgMQgcgMgNgUQgdgrALgxQAKgzAsgcQAqgcAyAJQAzALAcAsQASAbArAZQAVAKAVAIQBKAehFAjIgQAHIggAMQhQAchCAAIgJAAg");
	this.shape_141.setTransform(190.7876,198.4609);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(1,1,1).p("Ai6gVQAMg0AtgcQAsgdAyALQA0AMAdAtQASAcAsAaQAVALAWAIQBLAghGAjQgKAEgHADQgUAHgNAFQhYAdhIgDQgsgDgdgNQgbgMgOgVQgdgtALgyg");
	this.shape_142.setTransform(190.4134,198.1475);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("rgba(0,204,255,0.627)").s().p("Ag2B7QgsgDgdgNQgbgMgOgVQgdgtALgyQAMg0AtgcQAsgdAyALQA0AMAdAtQASAcAsAaQAVALAWAIQBLAghGAjIgRAHIghAMQhPAahDAAIgOAAg");
	this.shape_143.setTransform(190.4134,198.1475);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(1,1,1).p("Ai+gYQAMg1AvgcQAtgdA0AMQA1ANAdAuQATAdAsAbQAVAMAWAIQBNAihIAjQgKAEgIADQgTAHgOAEQhbAehKgEQgtgEgdgNQgcgNgOgWQgdguAMgzg");
	this.shape_144.setTransform(190.0573,197.8586);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("rgba(0,204,255,0.627)").s().p("Ag5B+QgtgEgdgNQgcgNgOgWQgdguAMgzIAAgBQAMg1AvgcQAtgdA0AMQA1ANAdAuQATAdAsAbQAVAMAWAIQBNAihIAjIgSAHIghALQhQAahCAAIgTAAg");
	this.shape_145.setTransform(190.0573,197.8586);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(1,1,1).p("AjCgaQANg2AxgcQAugdA1AMQA2AOAdAwQATAeAtAcQAVAMAXAJQBPAjhLAjQgKAEgIADQgUAHgOAFQhdAdhMgFQgvgEgdgOQgdgOgNgXQgegvANg0g");
	this.shape_146.setTransform(189.7091,197.5735);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("rgba(0,204,255,0.627)").s().p("Ag7CBQgvgEgdgOQgdgOgNgXQgegvANg0IAAgBQANg2AxgcQAugdA1AMQA2AOAdAwQATAeAtAcQAVAMAXAJQBPAjhLAjIgSAHIgiAMQhPAYhDAAIgXAAg");
	this.shape_147.setTransform(189.7091,197.5735);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(1,1,1).p("AjGgcQAPg4AygcQAvgdA2ANQA4APAdAxQATAfAtAdQAWANAXAJQBQAlhMAjQgLAEgIADQgUAHgPAFQhgAdhOgGQgvgFgegPQgdgOgOgYQgegxAOg1g");
	this.shape_148.setTransform(189.322,197.3002);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("rgba(0,204,255,0.627)").s().p("Ag+CEQgvgFgegPQgdgOgOgYQgegxAOg1QAPg4AygcQAvgdA2ANQA4APAdAyQATAeAtAdQAWANAXAJQBQAlhMAjIgTAIIgjALQhPAYhDAAIgcgBg");
	this.shape_149.setTransform(189.322,197.3002);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(1,1,1).p("AhBCHQBcAIB1gnQAMgFAIgCQBWgkhPglQgbgLgVgNQgxgfgTghQgdgzg4gQQg4gOgyAdQgzAdgPA5QgPA2AeAzQAbAxBfALg");
	this.shape_150.setTransform(189.048,197.0042);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("rgba(0,204,255,0.627)").s().p("AhBCHQhfgLgbgxQgegzAPg2QAPg5AzgdQAygdA4AOQA4AQAdAzQATAhAxAfQAVANAbALQBPAlhWAkIgUAHQhiAghPAAIgggBg");
	this.shape_151.setTransform(189.048,197.0042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_23},{t:this.shape_22}]},1).to({state:[{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_31},{t:this.shape_30}]},1).to({state:[{t:this.shape_33},{t:this.shape_32}]},1).to({state:[{t:this.shape_35},{t:this.shape_34}]},1).to({state:[{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_39},{t:this.shape_38}]},1).to({state:[{t:this.shape_41},{t:this.shape_40}]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},1).to({state:[{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_57},{t:this.shape_56}]},1).to({state:[{t:this.shape_59},{t:this.shape_58}]},1).to({state:[{t:this.shape_61},{t:this.shape_60}]},1).to({state:[{t:this.shape_63},{t:this.shape_62}]},1).to({state:[{t:this.shape_65},{t:this.shape_64}]},1).to({state:[{t:this.shape_67},{t:this.shape_66}]},1).to({state:[{t:this.shape_69},{t:this.shape_68}]},1).to({state:[{t:this.shape_71},{t:this.shape_70}]},1).to({state:[{t:this.shape_73},{t:this.shape_72}]},1).to({state:[{t:this.shape_75},{t:this.shape_74}]},1).to({state:[{t:this.shape_77},{t:this.shape_76}]},1).to({state:[{t:this.shape_79},{t:this.shape_78}]},1).to({state:[{t:this.shape_80},{t:this.shape_2}]},1).to({state:[{t:this.shape_82},{t:this.shape_81}]},1).to({state:[{t:this.shape_84},{t:this.shape_83}]},1).to({state:[{t:this.shape_86},{t:this.shape_85}]},1).to({state:[{t:this.shape_88},{t:this.shape_87}]},1).to({state:[{t:this.shape_90},{t:this.shape_89}]},1).to({state:[{t:this.shape_92},{t:this.shape_91}]},1).to({state:[{t:this.shape_94},{t:this.shape_93}]},1).to({state:[{t:this.shape_96},{t:this.shape_95}]},1).to({state:[{t:this.shape_98},{t:this.shape_97}]},1).to({state:[{t:this.shape_100},{t:this.shape_99}]},1).to({state:[{t:this.shape_102},{t:this.shape_101}]},1).to({state:[{t:this.shape_104},{t:this.shape_103}]},1).to({state:[{t:this.shape_106},{t:this.shape_105}]},1).to({state:[{t:this.shape_108},{t:this.shape_107}]},1).to({state:[{t:this.shape_109},{t:this.shape_50}]},1).to({state:[]},5).to({state:[{t:this.shape_111},{t:this.shape_110}]},150).to({state:[{t:this.shape_113},{t:this.shape_112}]},1).to({state:[{t:this.shape_115},{t:this.shape_114}]},1).to({state:[{t:this.shape_117},{t:this.shape_116}]},1).to({state:[{t:this.shape_119},{t:this.shape_118}]},1).to({state:[{t:this.shape_121},{t:this.shape_120}]},1).to({state:[{t:this.shape_123},{t:this.shape_122}]},1).to({state:[{t:this.shape_125},{t:this.shape_124}]},1).to({state:[{t:this.shape_127},{t:this.shape_126}]},1).to({state:[{t:this.shape_129},{t:this.shape_128}]},1).to({state:[{t:this.shape_131},{t:this.shape_130}]},1).to({state:[{t:this.shape_133},{t:this.shape_132}]},1).to({state:[{t:this.shape_135},{t:this.shape_134}]},1).to({state:[{t:this.shape_137},{t:this.shape_136}]},1).to({state:[{t:this.shape_139},{t:this.shape_138}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).wait(1));

	// Head
	this.instance_1 = new lib.人();
	this.instance_1.setTransform(180.1,189.9,1,1,0,0,0,25.6,25.6);
	var instance_1Filter_1 = new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_1];
	this.instance_1.cache(-3,-3,57,57);

	this.instance_2 = new lib.元件1();
	this.instance_2.setTransform(180.1,189.9,1,1,0,0,0,25.6,25.6);

	this.instance_3 = new lib.补间3("synched",0);
	this.instance_3.setTransform(180,189.85,1,1,14.9983);
	this.instance_3._off = true;
	var instance_3Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_3.filters = [instance_3Filter_2];
	this.instance_3.cache(-29,-29,57,57);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2,p:{regY:25.6,rotation:0,y:189.9}}]},39).to({state:[{t:this.instance_2,p:{regY:25.6,rotation:0,y:189.9}}]},20).to({state:[{t:this.instance_2,p:{regY:25.5,rotation:29.9992,y:189.85}}]},30).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},20).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(119).to({_off:false},0).to({regX:0.1,regY:0.1,rotation:59.998,x:195.8,y:183.9},30).to({rotation:149.9988,x:222.85,y:181.6},30).wait(5).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(21));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_1).wait(191));
	this.timeline.addTween(cjs.Tween.get(instance_3Filter_2).wait(119).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(70).to(new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0), 0).wait(41));

	// LineOfQuilt
	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(2,1,1).p("Ap5GWIAniyQEFmtHKjHQDEghE5DA");
	this.shape_152.setTransform(156.475,190.316);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(2,1,1).p("Ap3GUQAUhYAUhZQD3mZGkjDQAYgMAYgKQDEgfE4C/");
	this.shape_153.setTransform(156.675,190.152);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(2,1,1).p("Ap1GSQAVhYAUhXQD4mcGfi/QAYgLAZgKQDDgfE3C/");
	this.shape_154.setTransform(156.875,189.9645);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(2,1,1).p("ApzGQQAVhXAVhXQD4mfGci6QAYgLAZgJQDCgeE2C+");
	this.shape_155.setTransform(157.05,189.7763);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(2,1,1).p("ApxGOQAWhXAWhWQD4mhGYi2QAYgLAZgJQDCgdE0C9");
	this.shape_156.setTransform(157.225,189.6067);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#000000").ss(2,1,1).p("ApvGNQAXhXAWhVQD5mlGUixQAYgKAYgJQDCgcEzC8");
	this.shape_157.setTransform(157.425,189.4241);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(2,1,1).p("AptGLQAXhXAXhUQD5moGQisQAYgKAZgJQDCgbExC7");
	this.shape_158.setTransform(157.625,189.2547);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(2,1,1).p("AprGJQAXhWAYhUQD6mqGMioQAYgKAZgIQDBgaEwC6");
	this.shape_159.setTransform(157.825,189.0656);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#000000").ss(2,1,1).p("AppGHQAYhVAYhTQD6mtGJikQAYgJAZgIQDAgZEvC5");
	this.shape_160.setTransform(158,188.8959);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#000000").ss(2,1,1).p("ApmGFQAYhVAYhSQD7mwGFifQAYgJAYgIQDBgYEtC5");
	this.shape_161.setTransform(158.2,188.7119);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(2,1,1).p("AplGEQAZhVAZhSQD8myGAibQAYgJAZgHQDAgXEsC4");
	this.shape_162.setTransform(158.375,188.5419);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(2,1,1).p("ApjGBQAahUAZhRQD8m1F9iWQAYgJAZgGQC/gXErC3");
	this.shape_163.setTransform(158.575,188.3518);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#000000").ss(2,1,1).p("AphGAQAahUAahQQD9m4F5iSQAXgIAZgHQC/gVEqC2");
	this.shape_164.setTransform(158.775,188.1614);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#000000").ss(2,1,1).p("ApeF+QAahTAbhQQD9m7F1iMQAYgJAYgGQC/gUEoC1");
	this.shape_165.setTransform(158.95,187.9957);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(2,1,1).p("ApcF8QAbhTAbhPQD9m9FxiJQAYgIAZgFQC+gUEnC0");
	this.shape_166.setTransform(159.15,187.8252);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(2,1,1).p("ApbF6QAchSAchPQD+nAFtiEQAYgHAZgGQC+gTElC0");
	this.shape_167.setTransform(159.35,187.6591);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").ss(2,1,1).p("ApZF5QAchSAdhOQD/nDFph/QAXgHAZgGQC+gREkCy");
	this.shape_168.setTransform(159.525,187.4469);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(2,1,1).p("ApXF3QAdhSAdhNQD/nGFlh6QAYgHAZgFQC9gREjCy");
	this.shape_169.setTransform(159.725,187.2759);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").ss(2,1,1).p("ApVF1QAdhSAehMQEAnJFhh1QAYgHAYgFQC9gQEiCx");
	this.shape_170.setTransform(159.9,187.1087);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").ss(2,1,1).p("ApTFzQAehRAehMQEBnLFdhxQAYgHAYgEQC9gPEgCw");
	this.shape_171.setTransform(160.1,186.9161);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").ss(2,1,1).p("ApRFxQAehQAfhLQEBnOFZhtQAYgGAZgEQC8gOEfCv");
	this.shape_172.setTransform(160.3,186.7231);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#000000").ss(2,1,1).p("ApPFvQAfhQAghKQEBnRFVhoQAYgGAZgEQC7gNEeCu");
	this.shape_173.setTransform(160.475,186.5515);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#000000").ss(2,1,1).p("ApNFuQAghQAghKQEBnTFShkQAXgGAZgDQC8gMEcCt");
	this.shape_174.setTransform(160.675,186.3612);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#000000").ss(2,1,1).p("ApLFsQAghPAhhJQECnXFOhfQAXgFAZgDQC7gMEbCt");
	this.shape_175.setTransform(160.85,186.1892);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#000000").ss(2,1,1).p("ApJFqQAhhOAhhJQECnZFKhaQAYgGAZgCQC6gLEZCs");
	this.shape_176.setTransform(161.05,185.9948);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#000000").ss(2,1,1).p("ApHFoQAhhOAihIQEDncFGhWQAYgFAZgCQC5gKEZCs");
	this.shape_177.setTransform(161.25,185.8225);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#000000").ss(2,1,1).p("ApEFnQAghOAjhHQEEnfFChRQAXgFAZgCQC6gJEXCr");
	this.shape_178.setTransform(161.45,185.6298);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#000000").ss(2,1,1).p("ApDFlQAihOAjhGQEEniE+hNQAYgEAZgCQC5gIEWCq");
	this.shape_179.setTransform(161.625,185.457);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#000000").ss(2,1,1).p("ApBFjQAjhNAjhGQEFnkE6hIQAYgFAZgBQC4gHEVCp");
	this.shape_180.setTransform(161.8,185.261);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#000000").ss(2,1,1).p("Ao/FhQAjhNAkhEQEGnnE2hEQAYgEAZgBQC4gGETCo");
	this.shape_181.setTransform(162,185.0647);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#000000").ss(2,1,1).p("Ao+FgQEjpyFdhIQDEggE5DA");
	this.shape_182.setTransform(162.35,184.891);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").ss(2,1,1).p("ApAFgQEhpzFchHQDHghE9DC");
	this.shape_183.setTransform(162.7,184.9857);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#000000").ss(2,1,1).p("ApCFgQEgp0FZhHQDKgiFCDG");
	this.shape_184.setTransform(163.05,185.1003);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").ss(2,1,1).p("ApEFhQEep2FXhGQDNgjFHDI");
	this.shape_185.setTransform(163.425,185.2212);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#000000").ss(2,1,1).p("ApGFiQEdp4FUhGQDRgjFLDL");
	this.shape_186.setTransform(163.75,185.3176);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(2,1,1).p("ApIFiQEbp5FThFQDTgkFPDO");
	this.shape_187.setTransform(164.1,185.4317);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#000000").ss(2,1,1).p("ApJFjQEZp7FRhEQDWglFUDR");
	this.shape_188.setTransform(164.45,185.5281);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(2,1,1).p("ApMFkQEYp9FPhEQDZglFZDT");
	this.shape_189.setTransform(164.8,185.649);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#000000").ss(2,1,1).p("ApNFkQEWp/FMhCQDdgmFcDV");
	this.shape_190.setTransform(165.175,185.7629);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(2,1,1).p("ApPFkQEUqAFKhCQDggmFhDY");
	this.shape_191.setTransform(165.525,185.8594);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#000000").ss(2,1,1).p("ApRFlQETqCFIhBQDjgnFlDb");
	this.shape_192.setTransform(165.85,185.9552);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(2,1,1).p("ApTFmQERqEFHhAQDmgoFpDe");
	this.shape_193.setTransform(166.2,186.0947);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#000000").ss(2,1,1).p("ApVFmQEQqFFFhAQDogoFuDg");
	this.shape_194.setTransform(166.55,186.1905);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#000000").ss(2,1,1).p("ApXFnQEOqHFDg/QDrgpFzDj");
	this.shape_195.setTransform(166.925,186.287);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#000000").ss(2,1,1).p("ApZFnQENqIFBg/QDugqF3Dm");
	this.shape_196.setTransform(167.275,186.4007);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#000000").ss(2,1,1).p("ApbFoQELqKE/g+QDxgqF8Do");
	this.shape_197.setTransform(167.625,186.5287);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#000000").ss(2,1,1).p("ApcFoQEJqME9g9QD0gqGADr");
	this.shape_198.setTransform(167.95,186.6245);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#000000").ss(2,1,1).p("ApfFpQEIqOE7g8QD3grGFDt");
	this.shape_199.setTransform(168.3,186.7383);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("#000000").ss(2,1,1).p("ApgFpQEGqPE4g7QD6gsGJDw");
	this.shape_200.setTransform(168.675,186.8348);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(2,1,1).p("ApiFqQEEqRE3g7QD9gsGNDz");
	this.shape_201.setTransform(169.025,186.9306);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#000000").ss(2,1,1).p("ApkFqQEDqSE0g6QEAguGSD2");
	this.shape_202.setTransform(169.375,187.0699);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#000000").ss(2,1,1).p("ApmFrQEBqUEzg6QEDguGWD5");
	this.shape_203.setTransform(169.7,187.1657);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f().s("#000000").ss(2,1,1).p("ApoFrQEAqVEwg5QEGgvGbD8");
	this.shape_204.setTransform(170.05,187.2622);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#000000").ss(2,1,1).p("ApqFsQD+qXEug4QEKgwGfD+");
	this.shape_205.setTransform(170.425,187.3758);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f().s("#000000").ss(2,1,1).p("ApsFtQD9qZEsg4QEMgwGkEB");
	this.shape_206.setTransform(170.775,187.4967);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#000000").ss(2,1,1).p("ApuFtQD7qaEqg3QEQgxGoEE");
	this.shape_207.setTransform(171.125,187.5931);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f().s("#000000").ss(2,1,1).p("ApwFtQD6qcEog2QESgxGtEG");
	this.shape_208.setTransform(171.475,187.7067);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#000000").ss(2,1,1).p("ApyFuQD4qeEmg1QEWgyGwEJ");
	this.shape_209.setTransform(171.8,187.8032);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f().s("#000000").ss(2,1,1).p("ApzFvQD2qgEjg1QEZgyG1EL");
	this.shape_210.setTransform(172.175,187.924);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#000000").ss(2,1,1).p("Ap1FvQD0qhEig0QEcgzG5EO");
	this.shape_211.setTransform(172.525,188.0382);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f().s("#000000").ss(2,1,1).p("Ap3FwQDzqjEfgzQEfg0G+ER");
	this.shape_212.setTransform(172.875,188.1235);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#000000").ss(2,1,1).p("Ap1FrQB3k7CAizQCIjCCVgcQBDgNBMAGQD1ARFTDL");
	this.shape_213.setTransform(173,187.6432);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f().s("#000000").ss(2,1,1).p("ApyFnQB5kzCAizQCHjACUgdQBDgNBKAFQDzAQFRDG");
	this.shape_214.setTransform(173.125,187.1421);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#000000").ss(2,1,1).p("ApwFiQB7kqCBizQCHi+CRgdQBDgOBKAEQDvAOFRDB");
	this.shape_215.setTransform(173.25,186.6453);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f().s("#000000").ss(2,1,1).p("AptFdQB9kiCCizQCGi7CQgeQBCgPBJAEQDsAMFPC8");
	this.shape_216.setTransform(173.375,186.1568);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().s("#000000").ss(2,1,1).p("AprFZQB/kaCEizQCFi4COggQBBgOBIADQDpAKFPC3");
	this.shape_217.setTransform(173.5,185.6493);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f().s("#000000").ss(2,1,1).p("AppFUQCCkSCEizQCDi1COghQBBgPBGADQDmAIFPCy");
	this.shape_218.setTransform(173.65,185.1571);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().s("#000000").ss(2,1,1).p("ApmFQQCEkJCFizQCDi0CMghQA/gQBGACQDjAHFNCt");
	this.shape_219.setTransform(173.75,184.6386);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f().s("#000000").ss(2,1,1).p("ApkFLQCGkBCHiyQCBixCKgjQBAgQBFACQDgAFFMCn");
	this.shape_220.setTransform(173.875,184.1186);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().s("#000000").ss(2,1,1).p("AphFHQCIj5CIizQB/iuCKgjQA+gRBEABQDdADFLCj");
	this.shape_221.setTransform(174,183.6221);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f().s("#000000").ss(2,1,1).p("ApfFDQCLjxCIizQB/irCIglQA+gRBDAAQDaACFKCe");
	this.shape_222.setTransform(174.125,183.1);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().s("#000000").ss(2,1,1).p("ApcE+QCMjoCJizQB/ipCGglQA9gSBCAAQDXAAFJCY");
	this.shape_223.setTransform(174.275,182.5999);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f().s("#000000").ss(2,1,1).p("ApaE6QCPjgCKizQB9inCFgmQA9gSBBAAQDUgDFICU");
	this.shape_224.setTransform(174.375,182.0979);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().s("#000000").ss(2,1,1).p("ApXE1QCQjXCMizQB8ilCDgnQA8gSBAgBQDRgEFHCO");
	this.shape_225.setTransform(174.525,181.5695);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f().s("#000000").ss(2,1,1).p("ApVExQCTjQCNiyQB7iiCBgoQA7gTBAgCQDOgGFGCK");
	this.shape_226.setTransform(174.625,181.0625);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().s("#000000").ss(2,1,1).p("ApSEsQCVjHCNiyQB6igCAgpQA6gTBAgCQDKgIFFCE");
	this.shape_227.setTransform(174.775,180.5522);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f().s("#000000").ss(2,1,1).p("ApQEoQCYi+COizQB5ieB/gpQA5gUA+gDQDHgJFFB/");
	this.shape_228.setTransform(174.9,180.0171);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().s("#000000").ss(2,1,1).p("ApOEkQCai3CQiyQB4ibB9grQA4gUA+gDQDEgMFEB7");
	this.shape_229.setTransform(175,179.5007);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f().s("#000000").ss(2,1,1).p("ApLEgQCciuCQizQB3iZB8grQA4gUA8gFQDBgNFDB2");
	this.shape_230.setTransform(175.15,178.9602);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().s("#000000").ss(2,1,1).p("ApJEcQCeimCSizQB2iWB6gsQA3gVA8gFQC+gPFCBx");
	this.shape_231.setTransform(175.25,178.4368);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f().s("#000000").ss(2,1,1).p("ApGEXQCgidCSizQB1iUB5gtQA3gVA7gFQC6gRFBBr");
	this.shape_232.setTransform(175.4,177.9089);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().s("#000000").ss(2,1,1).p("ApEETQCjiVCTizQB0iRB3guQA2gWA6gGQC4gSFABm");
	this.shape_233.setTransform(175.525,177.3586);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f().s("#000000").ss(2,1,1).p("ApBEPQCliNCUizQByiOB3gvQA1gWA5gHQC0gUE/Bh");
	this.shape_234.setTransform(175.65,176.8219);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f().s("#000000").ss(2,1,1).p("Ao/ELQCniFCViyQByiMB0gwQA1gXA4gHQCygWE+Bc");
	this.shape_235.setTransform(175.775,176.2539);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f().s("#000000").ss(2,1,1).p("Ao8EHQCph8CWiyQBxiKBzgxQA0gXA3gIQCugYE9BX");
	this.shape_236.setTransform(175.875,175.6905);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f().s("#000000").ss(2,1,1).p("Ao6EDQCrh0CXiyQBwiHBygyQAzgYA2gIQCsgaE8BS");
	this.shape_237.setTransform(176.025,175.137);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f().s("#000000").ss(2,1,1).p("Ao4D/QCuhrCYizQBuiFBxgzQAzgXA0gJQCpgcE8BN");
	this.shape_238.setTransform(176.15,174.5632);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f().s("#000000").ss(2,1,1).p("Ao1D8QCwhkCZiyQBtiCBvg0QAygYA0gKQCmgdE6BI");
	this.shape_239.setTransform(176.275,173.9963);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f().s("#000000").ss(2,1,1).p("AozD4QCyhbCaizQBtiABtg0QAygZAzgKQCigfE6BD");
	this.shape_240.setTransform(176.4,173.4213);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f().s("#000000").ss(2,1,1).p("AowD0QC0hTCbiyQBrh9Bsg2QAxgZAygLQCgghE4A+");
	this.shape_241.setTransform(176.525,172.8268);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f().s("#000000").ss(2,1,1).p("AouDxQC3hLCbizQCcizCbgjQCcgiE4A5");
	this.shape_242.setTransform(176.65,172.2343);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f().s("#000000").ss(2,1,1).p("AovD0QC4hTCdiwQCdixCagkQCbglE4A1");
	this.shape_243.setTransform(176.625,172.7307);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f().s("#000000").ss(2,1,1).p("AowD4QC5hcCfitQCfivCZgmQCZgnE4Ay");
	this.shape_244.setTransform(176.6,173.2328);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f().s("#000000").ss(2,1,1).p("AoxD8QC6hlCgirQCgisCYgoQCZgoE4At");
	this.shape_245.setTransform(176.6,173.7214);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f().s("#000000").ss(2,1,1).p("AoyEAQC7htCiipQCiiqCWgpQCYgqE4Ap");
	this.shape_246.setTransform(176.575,174.1937);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f().s("#000000").ss(2,1,1).p("Ao0EEQC9h2CkimQCjioCVgrQCXgsE4Am");
	this.shape_247.setTransform(176.55,174.6445);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f().s("#000000").ss(2,1,1).p("Ao1EIQC/h/ClikQCkilCVgtQCVgtE5Ai");
	this.shape_248.setTransform(176.525,175.123);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f().s("#000000").ss(2,1,1).p("Ao2EMQDAiHCniiQCliiCUgvQCUgwE5Af");
	this.shape_249.setTransform(176.5,175.5575);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f().s("#000000").ss(2,1,1).p("Ao3EQQDBiPCoifQCoigCSgxQCTgxE5Aa");
	this.shape_250.setTransform(176.5,175.988);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f().s("#000000").ss(2,1,1).p("Ao4EUQDCiYCqicQCpieCRgyQCSgzE5AW");
	this.shape_251.setTransform(176.475,176.4056);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f().s("#000000").ss(2,1,1).p("Ao5EZQDEihCriaQCqibCQg0QCRg1E6AT");
	this.shape_252.setTransform(176.45,176.8243);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f().s("#000000").ss(2,1,1).p("Ao7EeQDGiqCsiXQCtiZCOg2QCQg3E6AP");
	this.shape_253.setTransform(176.425,177.2143);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f().s("#000000").ss(2,1,1).p("Ao8EjQDHiyCuiVQCuiXCOg3QCOg5E6AL");
	this.shape_254.setTransform(176.4,177.5854);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f().s("#000000").ss(2,1,1).p("Ao9EoQDIi7CwiSQCviUCMg6QCOg6E6AH");
	this.shape_255.setTransform(176.4,177.9324);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f().s("#000000").ss(2,1,1).p("Ao+EtQDJjDCxiQQCxiSCMg7QCMg8E6AD");
	this.shape_256.setTransform(176.375,178.2904);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f().s("#000000").ss(2,1,1).p("Ao/EzQDLjMCziOQCxiPCLg9QCLg+E7gB");
	this.shape_257.setTransform(176.35,178.6);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f().s("#000000").ss(2,1,1).p("ApBE4QDNjVC0iLQC0iMCJg/QCKhAE7gE");
	this.shape_258.setTransform(176.325,178.9);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f().s("#000000").ss(2,1,1).p("ApCE+QDOjeC2iJQC1iJCIhBQCJhCE7gI");
	this.shape_259.setTransform(176.3,179.225);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f().s("#000000").ss(2,1,1).p("ApDFDQDPjmC3iGQC3iHCHhDQCIhEE7gL");
	this.shape_260.setTransform(176.3,179.525);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f().s("#000000").ss(2,1,1).p("ApEFJQDQjvC5iEQC4iFCGhEQCHhFE7gQ");
	this.shape_261.setTransform(176.275,179.825);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f().s("#000000").ss(2,1,1).p("ApGFOQDSj3C7iBQC5iDCFhGQCGhHE8gT");
	this.shape_262.setTransform(176.25,180.125);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f().s("#000000").ss(2,1,1).p("ApHFUQDUkAC8h/QC6iACEhIQCFhJE8gX");
	this.shape_263.setTransform(176.225,180.45);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f().s("#000000").ss(2,1,1).p("ApIFaQDVkJC9h8QC8h+CEhKQCDhKE8gc");
	this.shape_264.setTransform(176.2,180.75);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f().s("#000000").ss(2,1,1).p("ApJFfQDWkRC/h6QC+h7CChMQCChME8gf");
	this.shape_265.setTransform(176.2,181.05);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f().s("#000000").ss(2,1,1).p("ApKFlQDXkaDBh3QC/h5CBhNQCBhPE8gj");
	this.shape_266.setTransform(176.175,181.35);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f().s("#000000").ss(2,1,1).p("ApMFqQDZkjDCh1QDBh1CAhQQCAhQE9gm");
	this.shape_267.setTransform(176.15,181.675);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f().s("#000000").ss(2,1,1).p("ApNFwQDbksDDhyQDChzB/hSQB/hSE9gq");
	this.shape_268.setTransform(176.125,181.975);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f().s("#000000").ss(2,1,1).p("ApOF1QDck0DFhwQDEhxB9hTQB+hTE9gu");
	this.shape_269.setTransform(176.1,182.275);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f().s("#000000").ss(2,1,1).p("ApPF7QDdk9DGhtQDFhvB9hUQB9hWE9gy");
	this.shape_270.setTransform(176.1,182.575);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f().s("#000000").ss(2,1,1).p("ApQGBQDelGDIhrQDHhsB7hWQB8hYE9g1");
	this.shape_271.setTransform(176.075,182.9);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f().s("#000000").ss(2,1,1).p("ApSGGQDhlODJhoQDIhqB6hZQB7hYE9g6");
	this.shape_272.setTransform(176.05,183.2);

	this.instance_4 = new lib.被子4("synched",0);
	this.instance_4.setTransform(138.4,179.75,1,1,0,0,0,126.8,69.1);
	var instance_4Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_4.filters = [instance_4Filter_3];
	this.instance_4.cache(-2,-3,258,144);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_152}]},59).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_227}]},1).to({state:[{t:this.shape_228}]},1).to({state:[{t:this.shape_229}]},1).to({state:[{t:this.shape_230}]},1).to({state:[{t:this.shape_231}]},1).to({state:[{t:this.shape_232}]},1).to({state:[{t:this.shape_233}]},1).to({state:[{t:this.shape_234}]},1).to({state:[{t:this.shape_235}]},1).to({state:[{t:this.shape_236}]},1).to({state:[{t:this.shape_237}]},1).to({state:[{t:this.shape_238}]},1).to({state:[{t:this.shape_239}]},1).to({state:[{t:this.shape_240}]},1).to({state:[{t:this.shape_241}]},1).to({state:[{t:this.shape_242}]},1).to({state:[{t:this.shape_243}]},1).to({state:[{t:this.shape_244}]},1).to({state:[{t:this.shape_245}]},1).to({state:[{t:this.shape_246}]},1).to({state:[{t:this.shape_247}]},1).to({state:[{t:this.shape_248}]},1).to({state:[{t:this.shape_249}]},1).to({state:[{t:this.shape_250}]},1).to({state:[{t:this.shape_251}]},1).to({state:[{t:this.shape_252}]},1).to({state:[{t:this.shape_253}]},1).to({state:[{t:this.shape_254}]},1).to({state:[{t:this.shape_255}]},1).to({state:[{t:this.shape_256}]},1).to({state:[{t:this.shape_257}]},1).to({state:[{t:this.shape_258}]},1).to({state:[{t:this.shape_259}]},1).to({state:[{t:this.shape_260}]},1).to({state:[{t:this.shape_261}]},1).to({state:[{t:this.shape_262}]},1).to({state:[{t:this.shape_263}]},1).to({state:[{t:this.shape_264}]},1).to({state:[{t:this.shape_265}]},1).to({state:[{t:this.shape_266}]},1).to({state:[{t:this.shape_267}]},1).to({state:[{t:this.shape_268}]},1).to({state:[{t:this.shape_269}]},1).to({state:[{t:this.shape_270}]},1).to({state:[{t:this.shape_271}]},1).to({state:[{t:this.shape_272}]},1).to({state:[{t:this.instance_4}]},10).wait(41));
	this.timeline.addTween(cjs.Tween.get(instance_4Filter_3).wait(189).to(new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0), 0).wait(41));

	// Quilt
	this.instance_5 = new lib.被子2("synched",0);
	this.instance_5.setTransform(128.2,176.85,1,1,0,0,0,115.5,68.2);
	var instance_5Filter_4 = new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0);
	this.instance_5.filters = [instance_5Filter_4];
	this.instance_5.cache(-2,-3,235,142);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f().s("#000000").ss(2,1,1).p("Ax0GGQFCBqGJC0QCaAYAuhIIBki8QETmGDsiBQBZgyDnAyIDPCSQCPA3A4g3QCcjbquloQojjsuXBeAlSI0QAGiOCPjXQEKmVGYhJQEJgSC/DF");
	this.shape_273.setTransform(128.743,176.8309);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#3358B8").s().p("AmfKkQmJi0lChqQhepMFenIQOXheIiDsQKvFoicDbQg4A3iQg3IjPiSQjmgyhZAyQjsCBkTGGIhlC8QgiA2heAAQggAAgngGgAHukPQmXBJkLGVQiODXgHCOQAHiOCOjXQELmVGXhJIADAAIAogCIAAAAIABAAQDqAACtCvIAGAGIgGgGQitivjqAAIgBAAIAAAAIgoACIgDAAg");
	this.shape_274.setTransform(127.7537,176.8309);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f().s("#000000").ss(2,1,1).p("Ax0GGQFCBqGJC0QCaAYAuhIIBki8QETmGDsiBQBZgyDnAyIDPCSQCPA3A4g3QCcjbquloQojjsuXBe");
	this.shape_275.setTransform(128.743,176.8309);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#3358B8").s().p("AmfKkQmJi0lChqQhepMFenIQOXheIiDsQKvFoicDbQg4A3iQg3IjPiSQjmgyhZAyQjsCBkTGGIhlC8QgiA2heAAQggAAgngGg");
	this.shape_276.setTransform(127.7537,176.8309);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f().s("#000000").ss(2,1,1).p("AxqGFQhepNFcm/QOChsI5DyQKvFoicDaQg4A3iQg3IjPiSQjmgxhaAxQjnB/kTGJQgzBhgzBcQguBIiagYQmJiulEhxg");
	this.shape_277.setTransform(127.7542,176.9877);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#3358B8").s().p("AmdKkQmJiulEhxQhepNFcm/QOChsI5DyQKvFoicDaQg4A3iQg3IjPiSQjmgxhaAxQjnB/kTGJQgzBhgzBcQgiA2hfAAQggAAgngGg");
	this.shape_278.setTransform(127.7542,176.9877);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f().s("#000000").ss(2,1,1).p("AxqGDQhepMFbm3QNth7JQD5QKuFnicDbQg4A3iQg3IjPiSQjmgyhaAyQjkB8kSGMQgzBkg0BbQguBGiagXQmJiolHh5g");
	this.shape_279.setTransform(127.7528,177.1163);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#3358B8").s().p("AmaKkQmJiolHh5QhepMFbm3QNth7JQD5QKuFnicDbQg4A3iQg3IjPiSQjmgyhaAyQjkB8kSGMQgzBkg0BbQgjA1hfAAQggAAgmgGg");
	this.shape_280.setTransform(127.7528,177.1163);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f().s("#000000").ss(2,1,1).p("AxqGCQhepMFamvQNZiJJlEAQKuFmicDbQg4A3iQg3IjPiSQjmgyhbAyQjfB5kSGPQgzBng1BaQguBFibgXQmIiilKiAg");
	this.shape_281.setTransform(127.7649,177.2402);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#3358B8").s().p("AmYKkQmIiilKiAQhepMFamvQNZiJJlEAQKuFmicDbQg4A3iQg3IjPiSQjmgyhbAyQjfB5kSGPQgzBng1BaQgjA0hgAAQgfAAgngGg");
	this.shape_282.setTransform(127.7649,177.2402);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f().s("#000000").ss(2,1,1).p("AxqGBQhepMFYmmQNEiYJ8EHQKuFlicDbQg4A3iQg3IjPiSQjmgyhcAyQjaB2kSGSQg0Bqg1BZQgvBDibgVQmHiclNiIg");
	this.shape_283.setTransform(127.7615,177.3391);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#3358B8").s().p("AmWKlQmHiclNiIQhepMFYmmQNEiYJ8EHQKuFlicDbQg4A3iQg3IjPiSQjmgyhcAyQjaB2kSGSQg0Bqg1BZQgjAzhiAAQgfAAgmgFg");
	this.shape_284.setTransform(127.7615,177.3391);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f().s("#000000").ss(2,1,1).p("AxqGAQhepMFXmeQMvimKSENQKuFlicDbQg4A3iQg3IjPiSQjmgyhcAyQjWB0kSGUQg0Btg2BZQgvBBibgVQmHiWlQiPg");
	this.shape_285.setTransform(127.76,177.4376);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#3358B8").s().p("AmTKlQmHiWlQiPQhepMFXmeQMvimKSENQKuFlicDbQg4A3iQg3IjPiSQjmgyhcAyQjWB0kSGUQg0Btg2BZQgkAxhhAAQgfAAgmgFg");
	this.shape_286.setTransform(127.76,177.4376);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().s("#000000").ss(2,1,1).p("AxqF/QhepMFWmVQMZi1KpEUQKuFkicDbQg4A3iQg3IjPiSQjmgyhdAyQjSBxkRGXQg0Bxg4BXQgvBAibgUQmGiRlTiWg");
	this.shape_287.setTransform(127.7565,177.5157);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#3358B8").s().p("AmRKmQmGiRlTiWQhepMFWmVQMZi1KpEUQKuFkicDbQg4A3iQg3IjPiSQjmgyhdAyQjSBxkRGXQg0Bxg4BXQgjAxhjAAQgfAAglgFg");
	this.shape_288.setTransform(127.7565,177.5157);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().s("#000000").ss(2,1,1).p("AxqF/QhepNFVmMQMEjDK/EaQKuFkicDaQg4A3iQg3IjPiSQjmgxhdAxQjOBvkRGaQg1Bzg4BWQgvA/ibgTQmGiLlWidg");
	this.shape_289.setTransform(127.7542,177.5946);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#3358B8").s().p("AmOKnQmGiLlWidQhepNFVmMQMEjDK/EaQKuFkicDaQg4A3iQg3IjPiSQjmgxhdAxQjOBvkRGaQg1Bzg4BWQgkAwhjAAQgeAAglgEg");
	this.shape_290.setTransform(127.7542,177.5946);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().s("#000000").ss(2,1,1).p("AxqF+QhepNFTmEQLwjRLVEhQKuFjicDaQg4A3iQg3IjPiSQjmgxheAyQjJBrkRGdQg1B2g5BVQgwA+ibgTQmFiFlZikg");
	this.shape_291.setTransform(127.7507,177.6617);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#3358B8").s().p("AmMKnQmFiFlZikQhepNFTmEQLwjRLVEhQKuFjicDaQg4A3iQg3IjPiSQjmgxheAyQjJBrkRGdQg1B2g5BVQgkAwhlAAQgeAAgkgFg");
	this.shape_292.setTransform(127.7507,177.6617);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().s("#000000").ss(2,1,1).p("AxpF+QhfpNFSl8QLajgLtEoQKtFiicDbQg4A3iQg3IjPiSQjmgyheAyQjFBpkRGgQg1B5g6BUQgwA8ibgSQmFh/lbirg");
	this.shape_293.setTransform(127.7633,177.7284);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#3358B8").s().p("AmJKoQmFh/lbirQhfpNFSl8QLajgLtEoQKtFiicDbQg4A3iQg3IjPiSQjmgyheAyQjFBpkRGgQg1B5g6BUQglAuhkAAQgeAAgkgEg");
	this.shape_294.setTransform(127.7633,177.7284);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().s("#000000").ss(2,1,1).p("AxpF9QhfpNFRlzQLFjuMDEuQKtFiicDaQg4A3iQg3IjPiSQjmgxhfAyQjABmkRGiQg2B9g6BTQgwA6icgRQmEh5leizg");
	this.shape_295.setTransform(127.7609,177.7794);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#3358B8").s().p("AmHKpQmEh5leizQhfpNFRlzQLFjuMDEuQKtFiicDaQg4A3iQg3IjPiSQjmgxhfAyQjABmkRGiQg2B9g6BTQglAthmAAQgeAAgjgEg");
	this.shape_296.setTransform(127.7609,177.7794);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().s("#000000").ss(2,1,1).p("AxpF9QhfpNFPlrQKxj9MZE1QKtFhicDbQg4A3iQg3IjPiSQjmgyhfAyQi9BkkQGlQg2CAg7BRQgxA6icgRQmDhzlhi6g");
	this.shape_297.setTransform(127.7572,177.8341);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#3358B8").s().p("AmFKqQmDhzlhi6QhfpNFPlrQKxj9MZE1QKtFhicDbQg4A3iQg3IjPiSQjmgyhfAyQi9BkkQGlQg2CAg7BRQgmAthmAAQgeAAgjgEg");
	this.shape_298.setTransform(127.7572,177.8341);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().s("#000000").ss(2,1,1).p("AxpF8QhfpNFOliQKbkLMwE7QKtFhicDaQg4A3iQg3IjPiSQjmgxhgAyQi4BhkQGoQg2CCg8BRQgxA4icgQQmDhtlkjCg");
	this.shape_299.setTransform(127.7545,177.877);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#3358B8").s().p("AmCKrQmDhtlkjCQhfpNFOliQKbkLMwE7QKtFhicDaQg4A3iQg3IjPiSQjmgxhgAyQi4BhkQGoQg2CCg8BRQgmAshoAAQgdAAgigEg");
	this.shape_300.setTransform(127.7545,177.877);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().s("#000000").ss(2,1,1).p("AxpF8QhfpNFNlaQKGkaNGFCQKtFgicDbQg4A3iQg3IjPiSQjmgyhhAyQizBfkQGqQg3CGg8BQQgyA2icgPQmChnlnjJg");
	this.shape_301.setTransform(127.752,177.9288);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#3358B8").s().p("AmAKsQmChnlnjJQhfpNFNlaQKGkaNGFCQKtFgicDbQg4A3iQg3IjPiSQjmgyhhAyQizBfkQGqQg3CGg8BQQgnAqhoAAQgdAAgigDg");
	this.shape_302.setTransform(127.752,177.9288);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().s("#000000").ss(2,1,1).p("AxpF7QhepNFLlRQJxkoNdFIQKsFgicDaQg4A3iPg3IjPiSQjngxhhAyQivBckPGtQg4CJg9BOQgyA1icgOQmChilqjQg");
	this.shape_303.setTransform(127.7483,177.9633);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#3358B8").s().p("Al9KtQmChilqjQQhepNFLlRQJxkoNdFIQKsFgicDaQg4A3iPg3IjPiSQjngxhhAyQivBckPGtQg4CJg9BOQgoAqhpAAQgcAAghgDg");
	this.shape_304.setTransform(127.7483,177.9633);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().s("#000000").ss(2,1,1).p("AxpF7QhfpNFKlJQJck2N0FOQKsFficDbQg4A3iQg3IjPiSQjmgyhiAyQiqBbkQGvQg3CMg/BNQgxA0idgOQmBhcltjXg");
	this.shape_305.setTransform(127.7618,178.0165);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#3358B8").s().p("Al7KuQmBhcltjXQhfpNFKlJQJck2N0FOQKsFficDbQg4A3iQg3IjPiSQjmgyhiAyQiqBbkQGvQg3CMg/BNQgnAphqAAQgcAAghgDg");
	this.shape_306.setTransform(127.7618,178.0165);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().s("#000000").ss(2,1,1).p("AxpF7QhfpNFJlBQJHlEOKFVQKsFeicDbQg4A3iQg3IjPiSQjmgyhiAyQinBYkPGyQg4CPg/BMQgyAyidgMQmBhWlvjfg");
	this.shape_307.setTransform(127.758,178.0386);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#3358B8").s().p("Al5KwQmBhWlvjfQhfpNFJlBQJHlEOKFVQKsFeicDbQg4A3iQg3IjPiSQjmgyhiAyQinBYkPGyQg4CPg/BMQgoAohsAAQgbAAgggCg");
	this.shape_308.setTransform(127.758,178.0386);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().s("#000000").ss(2,1,1).p("AxpF6QhfpNFHk4QIylTOhFcQKsFeicDaQg4A3iQg3IjPiSQjmgxhjAyQiiBVkPG1Qg4CRhABMQgyAwidgLQmBhRlyjmg");
	this.shape_309.setTransform(127.7543,178.0651);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#3358B8").s().p("Al2KxQmBhRlyjmQhfpNFHk4QIylTOhFcQKsFeicDaQg4A3iQg3IjPiSQjmgxhjAyQiiBVkPG1Qg4CRhABMQgoAnhvAAQgaAAgegCg");
	this.shape_310.setTransform(127.7543,178.0651);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().s("#000000").ss(2,1,1).p("AxpF6QhfpNFGkwQIdlhO3FiQKsFdicDbQg4A3iQg3IjPiSQjmgyhjAyQieBTkPG3Qg5CVhABKQgzAwidgLQmAhLl1jtg");
	this.shape_311.setTransform(127.7517,178.1034);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#3358B8").s().p("Al0KyQmAhLl1jtQhfpNFGkwQIdlhO3FiQKsFdicDbQg4A3iQg3IjPiSQjmgyhjAyQieBTkPG3Qg5CVhABKQgpAnhvAAQgaAAgegCg");
	this.shape_312.setTransform(127.7517,178.1034);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().s("#000000").ss(2,1,1).p("AxoF6QhfpNFEknQIIlwPOFpQKrFcicDbQg4A3iPg3IjPiSQjngyhkAyQiZBQkOG6Qg5CYhCBKQgzAtidgKQl/hEl4j1g");
	this.shape_313.setTransform(127.7487,178.1267);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#3358B8").s().p("AlxKzQl/hEl4j1QhfpNFEknQIIlwPOFpQKrFcicDbQg4A3iPg3IjPiSQjngyhkAyQiZBQkOG6Qg5CYhCBKQgqAlhxAAQgZAAgcgCg");
	this.shape_314.setTransform(127.7487,178.1267);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpNFDkeQHzl/PkFwQKrFcicDaQg4A3iPg3IjPiSQjngxhkAyQiVBNkOG9Qg6CbhCBIQgzAtidgKQl/g/l7j8g");
	this.shape_315.setTransform(127.7449,178.1548);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#3358B8").s().p("AluK0Ql/g/l7j8QhfpNFDkeQHzl/PkFwQKrFcicDaQg4A3iPg3IjPiSQjngxhkAyQiVBNkOG9Qg6CbhCBIQgqAlhyAAQgZAAgbgCg");
	this.shape_316.setTransform(127.7449,178.1548);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpNFCkWQHdmNP7F2QKrFcicDaQg4A3iPg3IjPiSQjngxhlAyQiQBKkOHAQg6CehDBHQg0AridgIQl+g5l+kEg");
	this.shape_317.setTransform(127.7423,178.1741);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#3358B8").s().p("AlsK2Ql+g5l+kEQhfpNFCkWQHdmNP7F2QKrFcicDaQg4A3iPg3IjPiSQjngxhlAyQiQBKkOHAQg6CehDBHQgrAkh1AAIgxgBg");
	this.shape_318.setTransform(127.7423,178.1741);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhgpNFBkNQHImcQSF9QKrFbicDaQg4A3iQg3IjPiSQjmgxhmAyQiMBIkOHCQg6CihEBGQgzApiegIQl+gzmAkLg");
	this.shape_319.setTransform(127.7541,178.1995);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#3358B8").s().p("AlqK3Ql+gzmAkLQhgpNFBkNQHImcQSF9QKrFbicDaQg4A3iQg3IjPiSQjmgxhmAyQiMBHkOHDQg6CihEBGQgrAih2AAIgwgBg");
	this.shape_320.setTransform(127.7541,178.1995);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhgpNE/kFQG0mqQoGDQKrFaicDbQg4A3iQg3IjPiSQjmgyhmAzQiIBFkNHFQg7CkhFBFQg0AoiegHQl9gtmDkSg");
	this.shape_321.setTransform(127.7501,178.2231);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#3358B8").s().p("AloK4Ql8gtmEkSQhfpNE+kFQG0mqQoGDQKrFaicDbQg4A3iQg3IjPiSQjmgyhmAzQiIBFkNHFQg7CkhFBFQgsAih5AAIgtgBg");
	this.shape_322.setTransform(127.7501,178.2231);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpNE+j9QGem4Q+GKQKrFZicDbQg4A3iPg3IjPiSQjngyhmAzQiEBCkNHIQg7CnhFBEQg1AniegGQl8gomHkZg");
	this.shape_323.setTransform(127.7475,178.2453);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#3358B8").s().p("AllK6Ql8gomHkZQhfpNE+j9QGem4Q+GKQKrFZicDbQg4A3iPg3IjPiSQjngyhmAzQiEBCkNHIQg7CnhFBEQgtAhh7AAIgrAAg");
	this.shape_324.setTransform(127.7475,178.2453);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpOE8j0QGKnHRUGRQKrFZicDaQg4A3iPg3IjPiSQjngxhnAyQh/BAkNHLQg8CqhGBDQg0AliegFQl9gimJkgg");
	this.shape_325.setTransform(127.7435,178.2605);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#3358B8").s().p("AliK7Ql9gimJkgQhfpOE8j0QGKnHRUGRQKrFZicDaQg4A3iPg3IjPiSQjngxhnAyQh/BAkNHLQg8CqhGBDQguAhh+AAIgmgBg");
	this.shape_326.setTransform(127.7435,178.2605);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpOE7jrQF0nWRsGXQKqFZicDaQg4A3iPg3IjPiSQjngxhnAyQh7A9kNHOQg8CthHBCQg1AkiegFQl8gcmMkng");
	this.shape_327.setTransform(127.7416,178.281);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#3358B8").s().p("AlgK8Ql8gcmMknQhfpOE7jrQF0nWRsGXQKqFZicDaQg4A3iPg3IjPiSQjngxhnAyQh7A9kNHOQg8CthHBCQguAgiAAAIglgBg");
	this.shape_328.setTransform(127.7416,178.281);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f().s("#000000").ss(2,1,1).p("AxoF5QhfpOE6jjQFfnkSCGeQKqFYicDaQg4A3iPg3IjPiSQjngxhoAyQh3A7kMHQQg8CxhIBAQg1AjifgEQl7gWmPkvg");
	this.shape_329.setTransform(127.7376,178.2953);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#3358B8").s().p("AleK+Ql7gWmPkvQhfpOE6jjQFfnkSCGeQKqFYicDaQg4A3iPg3IjPiSQjngxhoAyQh3A7kMHQQg8CxhIBAQgwAfiEAAIggAAg");
	this.shape_330.setTransform(127.7376,178.2953);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().s("#000000").ss(2,1,1).p("AxnF4QhgpNE4jbQFLnySYGkQKqFXicDbQg4A3iPg3IjPiSQjngyhpAzQhyA3kMHUQg9CzhIBAQg1AhifgDQl7gQmRk3g");
	this.shape_331.setTransform(127.7481,178.3213);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#3358B8").s().p("AlbK/Ql7gQmRk3QhgpNE4jbQFLnySYGkQKqFXicDbQg4A3iPg3IjPiSQjngyhpAzQhyA3kMHUQg9CzhIBAQgwAeiHAAIgdAAg");
	this.shape_332.setTransform(127.7481,178.3213);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().s("#000000").ss(2,1,1).p("AxnF4QhgpNE3jSQE1oBSvGrQKqFWicDbQg4A3iPg3IjPiSQjngyhpAzQhuA1kNHWQg8C3hJA+Qg2AgifgDQl6gKmUk+g");
	this.shape_333.setTransform(127.7462,178.3358);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#3358B8").s().p("AlZLAQl6gKmUk+QhgpNE3jSQE1oBSvGrQKqFWicDbQg4A3iPg3IjPiSQjngyhpAzQhuA1kNHWQg8C3hJA+QgyAdiMAAIgXAAg");
	this.shape_334.setTransform(127.7462,178.3358);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f().s("#000000").ss(2,1,1).p("AxzF4QGYFFF5AEQCfADA2gfQBKg9A+i6QELnZBqgzQBqgyDmAxIDPCSQCPA3A5g3QCcjaqqlWQzGmykgIQ");
	this.shape_335.setTransform(128.8758,178.3541);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#3358B8").s().p("AlWLBQl6gEmXlFQhhpNE3jKQEfoQTGGyQKqFWicDaQg4A3iPg3IjPiSQjngxhqAyQhqAzkMHZQg8C6hKA9QgzAdiOAAIgUgBg");
	this.shape_336.setTransform(127.738,178.3541);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f().s("#000000").ss(2,1,1).p("AxpF3QhhpOE2jLQEioHS/GnQK2FOigDoQg4A3iSg4IjPiQQjng0hpAzQhqAykNHZQg8C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_337.setTransform(127.9109,178.4212);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#3358B8").s().p("AlYLBQl6gFmXlFQhhpOE2jLQEioHS/GnQK2FOigDoQg4A3iSg4IjPiQQjng0hpAzQhqAykNHZQg8C6hKA9QgzAdiPAAIgTAAg");
	this.shape_338.setTransform(127.9109,178.4212);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f().s("#000000").ss(2,1,1).p("AxrF3QhhpQE3jNQEin9S5GcQLCFFijD2Qg5A3iVg5IjOiOQjng1hqAyQhoAzkOHZQg9C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_339.setTransform(128.091,178.4833);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#3358B8").s().p("AlaLAQl5gEmYlFQhhpQE3jNQEin9S5GcQLCFFijD2Qg5A3iVg5IjOiOQjng1hqAyQhoAzkOHZQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_340.setTransform(128.091,178.4833);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f().s("#000000").ss(2,1,1).p("AxtF2QhipQE3jPQEkn0SzGQQLNE+imEEQg5A3iYg6IjOiMQjng4hpAzQhpAzkOHYQg9C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_341.setTransform(128.2598,178.5423);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#3358B8").s().p("AlcLAQl5gFmYlFQhipQE3jPQEkn0SzGQQLNE+imEEQg5A3iYg6IjOiMQjng4hpAzQhpAzkOHYQg9C6hKA9QgyAdiPAAIgUAAg");
	this.shape_342.setTransform(128.2598,178.5423);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f().s("#000000").ss(2,1,1).p("AxuF1QhkpRE4jRQElnqStGFQLZE2iqERQg4A3ibg7IjOiLQjog5hoAzQhpAzkOHYQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_343.setTransform(128.4294,178.6035);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#3358B8").s().p("AldK/Ql6gFmXlFQhkpRE4jRQElnqStGFQLZE2iqERQg4A3ibg7IjOiLQjog5hoAzQhpAzkOHYQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_344.setTransform(128.4294,178.6035);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f().s("#000000").ss(2,1,1).p("AxwF1QhkpTE4jSQEnnhSmF6QLlEuitEfQg5A3ieg9IjNiIQjog7hpAzQhoAzkOHYQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_345.setTransform(128.598,178.6691);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#3358B8").s().p("AlfK+Ql5gEmYlFQhkpTE4jSQEnnhSmF6QLlEuitEfQg5A3ieg9IjNiIQjog7hpAzQhoAzkOHYQg+C5hKA+QgzAciPAAIgTAAg");
	this.shape_346.setTransform(128.598,178.6691);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f().s("#000000").ss(2,1,1).p("AxyF0QhlpTE5jUQEonYSgFvQLxElixEtQg5A3ihg9IjNiHQjog9hoAzQhoAzkPHYQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_347.setTransform(128.7774,178.7342);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#3358B8").s().p("AlhK+Ql5gFmYlFQhlpTE5jUQEonYSgFvQLxElixEtQg5A3ihg9IjNiHQjog9hoAzQhoAzkPHYQg+C6hKA9QgyAdiQAAIgTAAg");
	this.shape_348.setTransform(128.7774,178.7342);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f().s("#000000").ss(2,1,1).p("AxzF0QhmpVE5jVQEpnPSaFkQL9Edi1E7Qg5A3ijg/IjNiEQjpg/hnAzQhoAzkQHYQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_349.setTransform(128.9468,178.7939);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#3358B8").s().p("AliK9Ql6gEmXlFQhmpVE5jVQEpnPSaFkQL9Edi1E7Qg5A3ijg/IjNiEQjpg/hnAzQhoAzkQHYQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_350.setTransform(128.9468,178.7939);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f().s("#000000").ss(2,1,1).p("Ax1FzQhnpVE6jXQEqnGSUFYQMIEWi4FJQg5A2img/IjNiDQjphBhnAzQhnA0kRHXQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_351.setTransform(129.1154,178.8497);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#3358B8").s().p("AlkK9Ql6gFmXlFQhnpWE6jWQEqnHSUFZQMIEWi4FJQg5A2img/IjNiDQjphBhnAzQhnA0kRHXQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_352.setTransform(129.1154,178.8497);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f().s("#000000").ss(2,1,1).p("Ax3FyQhnpWE6jZQErm9SOFOQMUEOi7FWQg6A3iphBIjMiBQjphDhnA0QhnAzkRHXQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_353.setTransform(129.2956,178.9082);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#3358B8").s().p("AlmK8Ql5gFmYlFQhnpWE6jZQErm9SOFOQMUEOi7FWQg6A3iphBIjMiBQjphDhnA0QhnAzkRHXQg+C6hKA9QgzAdiPAAIgTAAg");
	this.shape_354.setTransform(129.2956,178.9082);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f().s("#000000").ss(2,1,1).p("Ax5FyQhopYE7jaQEsm0SIFDQMgEFi/FkQg6A3ishCIjMh+QjphFhnAzQhmAzkSHYQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_355.setTransform(129.464,178.9706);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#3358B8").s().p("AloK7Ql5gEmYlFQhopYE7jaQEsm0SIFDQMgEFi/FkQg6A3ishCIjMh+QjphFhnAzQhmAzkSHYQg+C5hKA+QgyAciPAAIgUAAg");
	this.shape_356.setTransform(129.464,178.9706);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f().s("#000000").ss(2,1,1).p("Ax6FxQhqpYE8jcQEtmrSCE4QMsD9jDFyQg6A3iuhDIjMh9QjqhHhmA0QhmAzkTHXQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_357.setTransform(129.6324,179.0322);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#3358B8").s().p("AlpK7Ql6gFmXlFQhqpYE8jcQEtmrSCE4QMsD9jDFyQg6A3iuhDIjMh9QjqhHhmA0QhmAzkTHXQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_358.setTransform(129.6324,179.0322);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f().s("#000000").ss(2,1,1).p("Ax8FxQhqpaE8jeQEumhR8EtQM3D1jGF/Qg6A3ixhEIjLh7QjrhIhmAzQhmA0kTHXQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_359.setTransform(129.8127,179.0885);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#3358B8").s().p("AlrK6Ql6gEmXlFQhqpaE8jeQEumhR8EtQM3D1jGF/Qg6A3ixhEIjLh7QjrhIhmAzQhmA0kTHXQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_360.setTransform(129.8127,179.0885);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f().s("#000000").ss(2,1,1).p("Ax+FwQhrpaE9jgQEwmYR1EhQNDDujJGNQg7A3i0hFIjLh5QjqhLhmA0QhmAzkTHXQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_361.setTransform(129.981,179.1397);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#3358B8").s().p("AltK6Ql5gFmYlFQhrpaE9jgQEwmYR1EhQNDDujJGNQg7A3i0hFIjLh5QjqhLhmA0QhmAzkTHXQg+C6hKA9QgyAdiQAAIgTAAg");
	this.shape_362.setTransform(129.981,179.1397);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f().s("#000000").ss(2,1,1).p("AyAFwQhspcE9jhQEymPRvEWQNPDmjNGbQg7A2i3hGIjKh3QjrhMhmAzQhlA0kUHXQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_363.setTransform(130.1502,179.1941);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#3358B8").s().p("AluK5Ql6gEmXlFQhtpcE+jhQExmPRvEWQNPDmjNGbQg7A2i3hGIjKh3QjrhMhlAzQhmA0kUHXQg+C5hKA+QgyAciPAAIgTAAg");
	this.shape_364.setTransform(130.1502,179.1941);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f().s("#000000").ss(2,1,1).p("AyBFvQhtpdE+jjQEymFRpELQNbDdjRGpQg6A3i6hIIjKh1QjshOhlA0QhlAzkVHXQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_365.setTransform(130.3373,179.2517);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#3358B8").s().p("AlwK4Ql6gEmXlFQhtpdE+jjQEymFRpELQNbDdjRGpQg6A3i6hIIjKh1QjshOhlA0QhlAzkVHXQg9C5hKA+QgzAdiPAAIgTgBg");
	this.shape_366.setTransform(130.3373,179.2517);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f().s("#000000").ss(2,1,1).p("AyDFvQhupeE+jkQE0l9RiEAQNoDWjVG2Qg7A3i8hJIjKhzQjshQhkA0QhlAzkWHXQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_367.setTransform(130.5055,179.296);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#3358B8").s().p("AlyK4Ql6gEmXlFQhupeE+jkQE0l9RiEAQNoDWjVG2Qg7A3i8hJIjKhzQjshQhkA0QhlAzkWHXQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_368.setTransform(130.5055,179.296);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f().s("#000000").ss(2,1,1).p("AyFFuQhupfE+jmQE1lzRdD1QNzDNjYHEQg7A3jAhJIjJhxQjshThlA0QhkA0kWHWQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_369.setTransform(130.6746,179.347);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#3358B8").s().p("Al0K4Ql5gFmYlFQhupfE+jmQE1lzRdD1QNzDNjYHEQg7A3jAhJIjJhxQjshThlA0QhkA0kWHWQg+C6hKA9QgyAdiQAAIgTAAg");
	this.shape_370.setTransform(130.6746,179.347);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f().s("#000000").ss(2,1,1).p("AyGFuQhwpgE/joQE3lqRWDqQN/DFjcHSQg7A3jChLIjKhvQjshUhkA0QhkA0kXHWQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_371.setTransform(130.8426,179.3914);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#3358B8").s().p("Al1K3Ql6gEmXlFQhwpgE/joQE3lqRWDqQN/DFjcHSQg7A3jChLIjKhvQjshUhkA0QhkA0kXHWQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_372.setTransform(130.8426,179.3914);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f().s("#000000").ss(2,1,1).p("AyIFtQhwphE/jpQE4lhRQDfQOKC9jfHgQg7A2jFhLIjJhuQjthWhjA0QhkA0kYHWQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_373.setTransform(131.0228,179.4394);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#3358B8").s().p("Al3K3Ql6gFmXlFQhwphE/jpQE4lhRQDfQOKC9jfHgQg7A2jFhLIjJhuQjthWhjA0QhkA0kYHWQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_374.setTransform(131.0228,179.4394);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f().s("#000000").ss(2,1,1).p("AyKFtQhxpiFAjrQE5lYRKDUQOWC1jiHtQg8A3jIhNIjIhrQjthYhkA0QhjA0kYHWQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_375.setTransform(131.1908,179.4894);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#3358B8").s().p("Al5K2Ql5gEmYlFQhxpiFAjrQE5lYRKDUQOWC1jiHtQg8A3jIhNIjIhrQjthYhkA0QhjA0kYHWQg+C5hKA+QgzAciPAAIgTAAg");
	this.shape_376.setTransform(131.1908,179.4894);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f().s("#000000").ss(2,1,1).p("AyMFsQhypjFBjsQE6lPRDDJQOjCtjmH7Qg8A2jLhNIjIhqQjthahjA0QhjA1kZHVQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_377.setTransform(131.3587,179.5374);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#3358B8").s().p("Al7K2Ql5gFmYlFQhypjFBjsQE6lPRDDJQOjCtjmH7Qg8A2jLhNIjIhqQjthahjA0QhjA1kZHVQg+C6hKA9QgyAdiPAAIgUAAg");
	this.shape_378.setTransform(131.3587,179.5374);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f().s("#000000").ss(2,1,1).p("AyNFsQhzpkFBjvQE7lFQ+C+QOuCljqIIQg8A3jNhPIjIhnQjuhchiA0QhjA0kaHWQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_379.setTransform(131.5389,179.5797);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#3358B8").s().p("Al8K1Ql6gEmXlFQhzpkFBjvQE7lFQ+C+QOuCljqIIQg8A3jNhPIjIhnQjuhchiA0QhjA0kaHWQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_380.setTransform(131.5389,179.5797);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f().s("#000000").ss(2,1,1).p("AyPFrQh0plFCjwQE8k8Q3CyQO6CejtIWQg8A3jQhQIjIhmQjuhehiA1QhjA0kaHVQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_381.setTransform(131.7067,179.6127);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#3358B8").s().p("Al+K1Ql6gFmXlFQh0plFCjwQE8k8Q3CyQO6CejtIWQg8A3jQhQIjIhmQjuhehiA1QhjA0kaHVQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_382.setTransform(131.7067,179.6127);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f().s("#000000").ss(2,1,1).p("AyRFrQh0pmFCjyQE9kzQyCoQPFCVjwIkQg9A3jThRIjHhkQjuhghiA1QhjA0kaHVQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_383.setTransform(131.8754,179.6498);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#3358B8").s().p("AmAK1Ql5gFmYlFQh0pmFCjyQE9kzQyCoQPFCVjwIkQg9A3jThRIjHhkQjuhghiA1QhjA0kaHVQg+C5hKA+QgyAdiQAAIgTAAg");
	this.shape_384.setTransform(131.8754,179.6498);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f().s("#000000").ss(2,1,1).p("AyTFrQh1pnFDj0QE+kqQrCdQPSCNj0IyQg9A2jWhSIjHhhQjuhihiA0QhiA1kbHVQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_385.setTransform(132.0547,179.6867);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#3358B8").s().p("AmCK0Ql5gEmYlFQh1pnFDj0QE+kqQrCdQPSCNj0IyQg9A2jWhSIjHhhQjuhihiA0QhiA1kbHVQg+C5hKA+QgyAciPAAIgUAAg");
	this.shape_386.setTransform(132.0547,179.6867);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f().s("#000000").ss(2,1,1).p("AyUFqQh2poFDj1QFAkhQkCSQPeCFj4I/Qg9A3jYhTIjHhgQjvhkhhA1QhiA1kcHUQg9C6hKA9Qg2AfifgCQl6gFmXlFg");
	this.shape_387.setTransform(132.2223,179.72);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#3358B8").s().p("AmDK0Ql6gFmXlFQh2poFDj1QFAkhQkCSQPeCFj4I/Qg9A3jYhTIjHhgQjvhkhhA1QhiA1kcHUQg9C6hKA9QgzAdiPAAIgTAAg");
	this.shape_388.setTransform(132.2223,179.72);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f().s("#000000").ss(2,1,1).p("AyWFqQh3ppFEj3QFBkXQfCGQPpB9j7JNQg9A3jchUIjGheQjvhmhhA1QhiA1kcHUQg+C6hKA9Qg2AfifgCQl5gFmYlFg");
	this.shape_389.setTransform(132.3909,179.7463);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#3358B8").s().p("AmFK0Ql5gFmYlFQh3ppFEj3QFBkXQfCGQPpB9j7JNQg9A3jchUIjGheQjvhmhhA1QhiA1kcHUQg+C6hKA9QgzAdiPAAIgTAAg");
	this.shape_390.setTransform(132.3909,179.7463);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f().s("#000000").ss(2,1,1).p("AyYFqQh4pqFEj5QFDkOQYB7QP1B1j+JbQg9A3jfhWIjGhcQjvhnhhA1QhhA0kdHVQg+C5hKA+Qg2AeifgCQl5gEmYlFg");
	this.shape_391.setTransform(132.5584,179.7588);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#3358B8").s().p("AmHKzQl5gEmYlFQh4pqFEj5QFDkOQYB7QP1B1j+JbQg9A3jfhWIjGhcQjvhnhhA1QhhA0kdHVQg+C5hKA+QgyAdiPAAIgUgBg");
	this.shape_392.setTransform(132.5584,179.7588);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f().s("#000000").ss(2,1,1).p("AyZFqQh5prFFj7QFDkFQTBwQQABtkCJpQg9A3jhhXIjGhaQjwhphgA1QhhA1keHUQg9C5hKA+Qg2AeifgCQl6gEmXlFg");
	this.shape_393.setTransform(132.7386,179.7747);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#3358B8").s().p("AmIKzQl6gEmXlFQh5prFFj7QFDkFQTBwQQABtkCJpQg9A3jhhXIjGhaQjwhphgA1QhhA1keHUQg9C5hKA+QgzAciPAAIgTAAg");
	this.shape_394.setTransform(132.7386,179.7747);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f().s("#000000").ss(2,1,1).p("AysFqQGYFFF5AEQCfACA2geQBLg+A9i5QEfnUBgg1QBgg1DwBrIDFBYQDkBYA+g3QEFp2wMhlQwMhllFD8");
	this.shape_395.setTransform(134.5566,179.7859);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#3358B8").s().p("AmKKzQl5gEmYlFQh6psFGj8QFFj8QLBlQQNBlkGJ2Qg9A3jkhYIjGhYQjwhrhgA1QhgA1kfHUQg9C5hKA+QgyAciOAAIgVAAg");
	this.shape_396.setTransform(132.9001,179.7859);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjnhxhlA6QhlA7kaHNQhBC9hKA8Qg2AeifgCQl6gEmXlFg");
	this.shape_397.setTransform(132.906,179.7863);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjnhxhlA6QhlA7kaHNQhBC9hKA8QgzAciPAAIgTAAg");
	this.shape_398.setTransform(132.906,179.7863);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjeh3hpBAQhrBAkWHHQhFC/hJA7Qg2AeifgCQl6gEmXlFg");
	this.shape_399.setTransform(132.906,179.7863);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjeh3hpBAQhrBAkWHHQhFC/hJA7QgzAciPAAIgTAAg");
	this.shape_400.setTransform(132.906,179.7863);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjVh9huBFQhvBGkTHAQhIDDhJA5Qg2AeifgCQl6gEmXlFg");
	this.shape_401.setTransform(132.906,179.7863);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjVh9huBFQhvBGkTHAQhIDDhJA5QgzAciPAAIgTAAg");
	this.shape_402.setTransform(132.906,179.7863);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjMiDhzBLQh0BLkOG6QhMDFhJA4Qg2AeifgCQl6gEmXlFg");
	this.shape_403.setTransform(132.906,179.7863);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjMiDhzBLQh0BLkOG6QhMDFhJA4QgzAciPAAIgTAAg");
	this.shape_404.setTransform(132.906,179.7863);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjDiJh4BQQh5BRkKG0QhPDIhJA2Qg2AeifgCQl6gEmXlFg");
	this.shape_405.setTransform(132.906,179.7863);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQjDiJh4BQQh5BRkKG0QhPDIhJA2QgzAciPAAIgTAAg");
	this.shape_406.setTransform(132.906,179.7863);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQi6iPh9BWQh9BWkGGtQhTDLhJA1Qg2AeifgCQl6gEmXlFg");
	this.shape_407.setTransform(132.906,179.7863);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQi6iPh9BWQh9BWkGGtQhTDLhJA1QgzAciPAAIgTAAg");
	this.shape_408.setTransform(132.906,179.7863);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQixiViCBcQiCBbkCGnQhWDOhJAzQg2AeifgCQl6gEmXlFg");
	this.shape_409.setTransform(132.906,179.7863);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQixiViCBcQiCBbkCGnQhWDOhJAzQgzAciPAAIgTAAg");
	this.shape_410.setTransform(132.906,179.7863);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQioibiHBhQiGBij/GfQhZDRhJAyQg2AeifgCQl6gEmXlFg");
	this.shape_411.setTransform(132.906,179.7863);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQioibiHBhQiGBij/GfQhZDRhJAyQgzAciPAAIgTAAg");
	this.shape_412.setTransform(132.906,179.7863);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQifihiLBnQiMBnj6GZQhdDThJAxQg2AeifgCQl6gEmXlFg");
	this.shape_413.setTransform(132.906,179.7863);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQifihiLBnQiMBnj6GZQhdDThJAxQgzAciPAAIgTAAg");
	this.shape_414.setTransform(132.906,179.7863);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiWiniQBsQiRBtj2GSQhhDXhIAvQg2AeifgCQl6gEmXlFg");
	this.shape_415.setTransform(132.906,179.7863);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiWiniQBsQiRBtj2GSQhhDXhIAvQgzAciPAAIgTAAg");
	this.shape_416.setTransform(132.906,179.7863);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiNitiVByQiVBxjzGNQhkDZhIAuQg2AeifgCQl6gEmXlFg");
	this.shape_417.setTransform(132.906,179.7863);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiNitiVByQiVBxjzGNQhkDZhIAuQgzAciPAAIgTAAg");
	this.shape_418.setTransform(132.906,179.7863);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiEiziaB3QiaB3juGHQhoDchIAsQg2AeifgCQl6gEmXlFg");
	this.shape_419.setTransform(132.906,179.7863);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQiEiziaB3QiaB3juGHQhoDchIAsQgzAciPAAIgTAAg");
	this.shape_420.setTransform(132.906,179.7863);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQh7i5ifB9QifB8jqGAQhrDfhIArQg2AeifgCQl6gEmXlFg");
	this.shape_421.setTransform(132.906,179.7863);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQh7i5ifB9QifB8jqGAQhrDfhIArQgzAciPAAIgTAAg");
	this.shape_422.setTransform(132.906,179.7863);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhyi/ikCCQijCCjnF6QhuDihIApQg2AeifgCQl6gEmXlFg");
	this.shape_423.setTransform(132.906,179.7863);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhyi/ikCCQijCCjnF6QhuDihIApQgzAciPAAIgTAAg");
	this.shape_424.setTransform(132.906,179.7863);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhpjFioCIQipCHjjFzQhxDlhIAoQg2AeifgCQl6gEmXlFg");
	this.shape_425.setTransform(132.906,179.7863);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhpjFioCIQipCHjjFzQhxDlhIAoQgzAciPAAIgTAAg");
	this.shape_426.setTransform(132.906,179.7863);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhhjLisCOQiuCMjfFtQh0DohIAmQg2AeifgCQl6gEmXlFg");
	this.shape_427.setTransform(132.906,179.7863);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhhjLisCOQiuCMjfFtQh0DohIAmQgzAciPAAIgTAAg");
	this.shape_428.setTransform(132.906,179.7863);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhYjRixCTQiyCSjbFmQh5DrhHAlQg2AeifgCQl6gEmXlFg");
	this.shape_429.setTransform(132.906,179.7863);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhYjRixCTQiyCSjbFmQh5DrhHAlQgzAciPAAIgTAAg");
	this.shape_430.setTransform(132.906,179.7863);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhPjXi2CZQi3CYjXFfQh8DuhHAjQg2AeifgCQl6gEmXlFg");
	this.shape_431.setTransform(132.906,179.7863);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhPjXi2CZQi3CYjXFfQh8DuhHAjQgzAciPAAIgTAAg");
	this.shape_432.setTransform(132.906,179.7863);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhGjdi7CeQi8CejSFZQiADwhHAiQg2AeifgCQl6gEmXlFg");
	this.shape_433.setTransform(132.906,179.7863);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQhGjdi7CeQi8CejSFZQiADwhHAiQgzAciPAAIgTAAg");
	this.shape_434.setTransform(132.906,179.7863);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQg9jjjACkQjACjjPFSQiDD0hHAgQg2AeifgCQl6gEmXlFg");
	this.shape_435.setTransform(132.906,179.7863);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQg9jjjACkQjACjjPFSQiDD0hHAgQgzAciPAAIgTAAg");
	this.shape_436.setTransform(132.906,179.7863);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQg0jpjFCpQjFCpjLFMQiGD2hHAfQg2AeifgCQl6gEmXlFg");
	this.shape_437.setTransform(132.906,179.7863);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQg0jpjFCpQjFCpjLFMQiGD2hHAfQgzAciPAAIgTAAg");
	this.shape_438.setTransform(132.906,179.7863);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgrjvjJCvQjLCujGFFQiKD6hHAdQg2AeifgCQl6gEmXlFg");
	this.shape_439.setTransform(132.906,179.7863);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgrjvjJCvQjLCujGFFQiKD6hHAdQgzAciPAAIgTAAg");
	this.shape_440.setTransform(132.906,179.7863);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgij1jOC0QjPC0jDE/QiND8hHAcQg2AeifgCQl6gEmXlFg");
	this.shape_441.setTransform(132.906,179.7863);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgij1jOC0QjPC0jDE/QiND8hHAcQgzAciPAAIgTAAg");
	this.shape_442.setTransform(132.906,179.7863);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgZj7jTC6QjUC5i/E4QiQD/hHAbQg2AeifgCQl6gEmXlFg");
	this.shape_443.setTransform(132.906,179.7863);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgZj7jTC6QjUC5i/E4QiQD/hHAbQgzAciPAAIgTAAg");
	this.shape_444.setTransform(132.906,179.7863);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgQkBjYDAQjYC+i7EyQiVEChGAZQg2AeifgCQl6gEmXlFg");
	this.shape_445.setTransform(132.906,179.7863);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgQkBjYDAQjYC+i7EyQiVEChGAZQgzAciPAAIgTAAg");
	this.shape_446.setTransform(132.906,179.7863);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgHkHjdDFQjdDEi3ErQiYEFhGAYQg2AeifgCQl6gEmXlFg");
	this.shape_447.setTransform(132.906,179.7863);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQgHkHjdDFQjdDEi3ErQiYEFhGAYQgzAciPAAIgTAAg");
	this.shape_448.setTransform(132.906,179.7863);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQACkNjiDLQjiDJiyElQicEIhGAWQg2AeifgCQl6gEmXlFg");
	this.shape_449.setTransform(132.906,179.7863);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQACkNjiDLQjiDJiyElQicEIhGAWQgzAciPAAIgTAAg");
	this.shape_450.setTransform(132.906,179.7863);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQALkTjnDQQjmDQivEeQifEKhGAVQg2AeifgCQl6gEmXlFg");
	this.shape_451.setTransform(132.906,179.7863);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQALkTjnDQQjmDQivEeQifEKhGAVQgzAciPAAIgTAAg");
	this.shape_452.setTransform(132.906,179.7863);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f().s("#000000").ss(2,1,1).p("AybFqQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQAUkZjrDWQjsDVirEXQiiEOhGATQg2AeifgCQl6gEmXlFg");
	this.shape_453.setTransform(132.906,179.7863);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#3358B8").s().p("AmKKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkGJ2Qg9A3jkhYIjGhYQAUkZjrDWQjsDVirEXQiiEOhGATQgzAciPAAIgTAAg");
	this.shape_454.setTransform(132.906,179.7863);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f().s("#000000").ss(2,1,1).p("AysFqQGYFFF5AEQCfACA2geQBHgSClkRQCnkQDwjbQDwjbgcEfIDFBYQDkBYA+g3QEFp2wMhlQwMhllFD8");
	this.shape_455.setTransform(134.5566,179.7859);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#3358B8").s().p("AmKKzQl5gEmYlFQh6psFGj8QFFj8QLBlQQNBlkGJ2Qg9A3jkhYIjGhYQAdkfjwDbQjwDbinEQQimERhGASQgyAciOAAIgVAAg");
	this.shape_456.setTransform(132.9001,179.7859);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f().s("#000000").ss(2,1,1).p("AydFqQh5psFFj8QFFj8QMBlQQMBlkBJsQg8A4jrhVIjEhSQAVkRjtDWQjuDUilEQQimEPhGASQg2AeifgCQl5gEmYlFg");
	this.shape_457.setTransform(133.05,179.7863);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#3358B8").s().p("AmLKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlkCJsQg8A4jrhVIjEhSQAVkRjtDWQjuDUilEQQilEPhHASQgyAciPAAIgTAAg");
	this.shape_458.setTransform(133.05,179.7863);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f().s("#000000").ss(2,1,1).p("AyeFqQh6psFFj8QFFj8QMBlQQNBlj8JiQg8A6jyhTIjDhMQAOkDjqDQQjrDPilEOQikEOhGASQg2AeifgCQl6gEmXlFg");
	this.shape_459.setTransform(133.2112,179.7863);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#3358B8").s().p("AmNKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlj8JiQg8A6jyhTIjDhMQAOkDjqDQQjrDPilEOQikEOhGASQgzAciPAAIgTAAg");
	this.shape_460.setTransform(133.2112,179.7863);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f().s("#000000").ss(2,1,1).p("AygFqQh5psFFj8QFFj8QMBlQQMBlj3JYQg8A8j4hRIjBhGQAFj1jmDKQjoDKikENQikEMhGASQg2AeifgCQl5gEmYlFg");
	this.shape_461.setTransform(133.3573,179.7863);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#3358B8").s().p("AmPKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBlj3JYQg8A8j4hRIjBhGQAFj1jmDKQjoDKikENQikEMhGASQgyAciPAAIgUAAg");
	this.shape_462.setTransform(133.3573,179.7863);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f().s("#000000").ss(2,1,1).p("AyhFqQh6psFFj8QFFj8QMBlQQNBljzJOQg7A9j+hOIjBhAQgCjnjjDFQjlDDijEMQijELhGASQg2AeifgCQl6gEmXlFg");
	this.shape_463.setTransform(133.5044,179.7863);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#3358B8").s().p("AmQKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljzJOQg7A9j+hOIjBhAQgCjnjjDFQjlDDijEMQijELhGASQgzAciPAAIgTAAg");
	this.shape_464.setTransform(133.5044,179.7863);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f().s("#000000").ss(2,1,1).p("AyjFqQh5psFFj8QFFj8QMBlQQMBljuJEQg6A/kFhMIi/g6QgKjZjgC/QjiC+iiEKQijEKhGASQg2AeifgCQl5gEmYlFg");
	this.shape_465.setTransform(133.6691,179.7863);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#3358B8").s().p("AmSKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBljuJEQg6A/kFhMIi/g6QgKjZjgC/QjiC+iiEKQijEKhGASQgyAciQAAIgTAAg");
	this.shape_466.setTransform(133.6691,179.7863);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f().s("#000000").ss(2,1,1).p("AykFqQh6psFFj8QFFj8QMBlQQNBljqI5Qg5BCkMhJIi+g1QgRjLjdC5QjeC5ijEJQihEIhGASQg2AeifgCQl6gEmXlFg");
	this.shape_467.setTransform(133.8184,179.7863);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#3358B8").s().p("AmTKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljqI5Qg5BCkMhJIi+g1QgRjLjdC5QjeC5ijEJQihEIhGASQgzAciPAAIgTAAg");
	this.shape_468.setTransform(133.8184,179.7863);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f().s("#000000").ss(2,1,1).p("AymFqQh5psFFj8QFFj8QMBlQQMBljkIwQg5BCkThFIi8gwQgZi9jaC0QjbCziiEHQihEHhGASQg2AeifgCQl5gEmYlFg");
	this.shape_469.setTransform(133.9856,179.7863);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#3358B8").s().p("AmVKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBljkIwQg5BCkThFIi8gwQgZi9jaC0QjbCziiEHQihEHhGASQgzAciPAAIgTAAg");
	this.shape_470.setTransform(133.9856,179.7863);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f().s("#000000").ss(2,1,1).p("AynFqQh6psFFj8QFFj8QMBlQQNBljgImQg4BEkZhDIi8gqQggivjXCuQjYCtihEGQigEGhGASQg2AeifgCQl6gEmXlFg");
	this.shape_471.setTransform(134.1372,179.7863);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#3358B8").s().p("AmWKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljgImQg4BEkZhDIi8gqQggivjXCuQjYCtihEGQigEGhGASQgzAciPAAIgTAAg");
	this.shape_472.setTransform(134.1372,179.7863);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f().s("#000000").ss(2,1,1).p("AypFqQh5psFFj8QFFj8QMBlQQMBljbIcQg3BGkghBIi6gkQgoihjUCoQjVCoigEFQigEEhGASQg2AeifgCQl5gEmYlFg");
	this.shape_473.setTransform(134.2899,179.7863);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#3358B8").s().p("AmYKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBljbIcQg3BGkghBIi6gkQgoihjUCoQjVCoigEFQigEEhGASQgzAciPAAIgTAAg");
	this.shape_474.setTransform(134.2899,179.7863);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f().s("#000000").ss(2,1,1).p("AyrFqQh5psFFj8QFFj8QMBlQQMBljWISQg3BHkmg+Ii5geQgwiTjRCjQjSCiifEDQifEDhGASQg2AeifgCQl5gEmYlFg");
	this.shape_475.setTransform(134.4608,179.7863);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#3358B8").s().p("AmaKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBljWISQg3BHkmg+Ii5geQgwiTjRCjQjSCiifEDQifEDhGASQgyAciPAAIgUAAg");
	this.shape_476.setTransform(134.4608,179.7863);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f().s("#000000").ss(2,1,1).p("AysFqQh6psFFj8QFFj8QMBlQQNBljSIIQg2BJktg8Ii4gYQg3iFjOCdQjPCcieECQieEChGASQg2AeifgCQl6gEmXlFg");
	this.shape_477.setTransform(134.6158,179.7863);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#3358B8").s().p("AmbKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljSIIQg2BJktg8Ii4gYQg3iFjOCdQjPCcieECQieEChGASQgzAciPAAIgTAAg");
	this.shape_478.setTransform(134.6158,179.7863);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f().s("#000000").ss(2,1,1).p("AyuFqQh5psFFj8QFFj8QMBlQQMBljNH+Qg1BLk0g6Ii2gSQg/h3jLCXQjMCXidEBQieEAhGASQg2AeifgCQl5gEmYlFg");
	this.shape_479.setTransform(134.772,179.7863);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#3358B8").s().p("AmdKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBljNH+Qg1BLk0g6Ii2gSQg/h3jLCXQjMCXidEBQieEAhGASQgyAciQAAIgTAAg");
	this.shape_480.setTransform(134.772,179.7863);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f().s("#000000").ss(2,1,1).p("AyvFqQh6psFFj8QFFj8QMBlQQNBljJH0Qg0BMk7g3Ii1gMQhGhpjICSQjJCRidD/QicD/hGASQg2AeifgCQl6gEmXlFg");
	this.shape_481.setTransform(134.9468,179.7863);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#3358B8").s().p("AmeKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljJH0Qg0BMk7g3Ii1gMQhGhpjICSQjJCRidD/QicD/hGASQgzAciPAAIgTAAg");
	this.shape_482.setTransform(134.9468,179.7863);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f().s("#000000").ss(2,1,1).p("AyxFqQh6psFFj8QFFj8QMBlQQNBljEHpQg0BPlBg1Ii0gGQhNhbjFCMQjGCLicD+QicD+hGASQg2AeifgCQl6gEmXlFg");
	this.shape_483.setTransform(135.1054,179.7863);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#3358B8").s().p("AmgKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBljEHpQg0BPlBg1Ii0gGQhNhbjFCMQjGCLicD+QicD+hGASQgzAciPAAIgTAAg");
	this.shape_484.setTransform(135.1054,179.7863);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f().s("#000000").ss(2,1,1).p("AyzFqQh5psFFj8QFFj8QMBlQQMBli/HfQgzBRlHgzIizAAQhVhNjCCFQjDCHibD9QicD8hGASQg2AeifgCQl5gEmYlFg");
	this.shape_485.setTransform(135.2829,179.7863);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#3358B8").s().p("AmiKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBli/HfQgzBRlHgzIizAAQhVhNjCCFQjDCHibD9QicD8hGASQgzAciPAAIgTAAg");
	this.shape_486.setTransform(135.2829,179.7863);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f().s("#000000").ss(2,1,1).p("Ay0FqQh6psFFj8QFFj8QMBlQQNBli7HVQgyBTlOgxIiyAGQhdhAi/CBQi/CBibD7QiaD7hGASQg2AeifgCQl6gEmXlFg");
	this.shape_487.setTransform(135.4439,179.7863);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#3358B8").s().p("AmjKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBli7HVQgyBTlOgxIiyAGQhdhAi/CBQi/CBibD7QiaD7hGASQgzAciPAAIgTAAg");
	this.shape_488.setTransform(135.4439,179.7863);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f().s("#000000").ss(2,1,1).p("Ay2FqQh6psFFj8QFFj8QMBlQQNBli2HLQgxBVlVgvIixAMQhkgyi8B7Qi8B7iaD6QiaD6hGASQg2AeifgCQl6gEmXlFg");
	this.shape_489.setTransform(135.6061,179.7863);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#3358B8").s().p("AmlKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBli2HLQgxBVlVgvIixAMQhkgyi8B7Qi8B7iaD6QiaD6hGASQgzAciPAAIgTAAg");
	this.shape_490.setTransform(135.6061,179.7863);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f().s("#000000").ss(2,1,1).p("Ay4FqQh5psFFj8QFFj8QMBlQQMBlixHBQgxBWlbgsIivASQhsgki5B1Qi5B2iaD5QiZD4hGASQg2AeifgCQl5gEmYlFg");
	this.shape_491.setTransform(135.7877,179.7863);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#3358B8").s().p("AmnKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBlixHBQgxBWlbgsIivASQhsgki5B1Qi5B2iaD5QiZD4hGASQgzAciPAAIgTAAg");
	this.shape_492.setTransform(135.7877,179.7863);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f().s("#000000").ss(2,1,1).p("Ay6FqQh5psFFj8QFFj8QMBlQQMBlisG3QgwBYligqIiuAYQh0gWi2BwQi2BwiYD3QiZD3hGASQg2AeifgCQl5gEmYlFg");
	this.shape_493.setTransform(135.9525,179.7863);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#3358B8").s().p("AmpKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBlisG3QgwBYligqIiuAYQh0gWi2BwQi2BwiYD3QiZD3hGASQgyAciPAAIgUAAg");
	this.shape_494.setTransform(135.9525,179.7863);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f().s("#000000").ss(2,1,1).p("Ay7FqQh6psFFj8QFFj8QMBlQQNBlioGtQgvBalpgoIitAeQh7gIizBqQizBqiYD2QiXD2hGASQg2AeifgCQl6gEmXlFg");
	this.shape_495.setTransform(136.1185,179.7863);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#3358B8").s().p("AmqKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlioGtQgvBalpgoIitAeQh7gIizBqQizBqiYD2QiXD2hGASQgzAciPAAIgTAAg");
	this.shape_496.setTransform(136.1185,179.7863);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f().s("#000000").ss(2,1,1).p("Ay9FqQh6psFFj8QFFj8QMBlQQNBlijGiQgvBclvglIisAkQiCAGiwBkQiwBliXD1QiXD0hGASQg2AeifgCQl6gEmXlFg");
	this.shape_497.setTransform(136.3044,179.7863);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#3358B8").s().p("AmsKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlijGiQgvBclvglIisAkQiCAGiwBkQiwBliXD1QiXD0hGASQgzAciPAAIgTAAg");
	this.shape_498.setTransform(136.3044,179.7863);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f().s("#000000").ss(2,1,1).p("Ay/FqQh5psFFj8QFFj8QMBlQQMBlieGYQguBel2gjIiqAqQiLAUisBfQitBfiXDzQiWDzhGASQg2AeifgCQl5gEmYlFg");
	this.shape_499.setTransform(136.473,179.7863);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#3358B8").s().p("AmuKzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBlieGYQguBel2gjIiqAqQiLAUisBfQitBfiXDzQiWDzhGASQgyAciQAAIgTAAg");
	this.shape_500.setTransform(136.473,179.7863);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f().s("#000000").ss(2,1,1).p("AzAFqQh6psFFj8QFFj8QMBlQQNBliaGOQgtBgl9ghIipAwQiSAiipBZQiqBZiWDyQiVDyhGASQg2AeifgCQl6gEmXlFg");
	this.shape_501.setTransform(136.6429,179.7863);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#3358B8").s().p("AmvKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBliaGOQgtBgl9ghIipAwQiSAiipBZQiqBZiWDyQiVDyhGASQgzAciPAAIgTAAg");
	this.shape_502.setTransform(136.6429,179.7863);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f().s("#000000").ss(2,1,1).p("AzCFqQh6psFFj8QFFj8QMBlQQNBliVGEQgtBhmDgeIioA2QiZAwinBTQinBUiTDxQiWDwhGASQg2AeifgCQl6gEmXlFg");
	this.shape_503.setTransform(136.8332,179.7863);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#3358B8").s().p("AmxKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBliVGEQgtBhmDgeIioA2QiZAwinBTQinBUiTDxQiWDwhGASQgzAciPAAIgTAAg");
	this.shape_504.setTransform(136.8332,179.7863);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f().s("#000000").ss(2,1,1).p("AzEFqQh6psFFj8QFFj8QMBlQQNBliRF6QgrBjmKgbIinA7QihA9ijBPQikBOiTDvQiVDvhGASQg2AeifgCQl6gEmXlFg");
	this.shape_505.setTransform(137.0059,179.7863);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#3358B8").s().p("AmzKzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBliRF6QgrBjmKgbIinA7QihA9ijBPQikBOiTDvQiVDvhGASQgzAciPAAIgTAAg");
	this.shape_506.setTransform(137.0059,179.7863);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f().s("#000000").ss(2,1,1).p("AzGFqQh5psFFj8QFFj8QMBlQQMBliLFwQgrBlmRgZIilBBQipBLigBJQihBJiSDtQiVDuhGASQg2AeifgCQl5gEmYlFg");
	this.shape_507.setTransform(137.1993,179.7863);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#3358B8").s().p("Am1KzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBliLFwQgrBlmRgZIilBBIlJCUQihBJiSDtQiVDuhGASQgzAciPAAIgTAAg");
	this.shape_508.setTransform(137.1993,179.7863);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f().s("#000000").ss(2,1,1).p("AzIFqQh5psFFj8QFFj8QMBlQQMBliHFmQgqBmmXgWIikBHQiwBZieBDQidBDiSDtQiUDshGASQg2AeifgCQl5gEmYlFg");
	this.shape_509.setTransform(137.3747,179.7863);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#3358B8").s().p("Am3KzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBliHFmQgqBmmXgWIikBHQiwBZieBDQidBDiSDtQiUDshGASQgyAciQAAIgTAAg");
	this.shape_510.setTransform(137.3747,179.7863);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f().s("#000000").ss(2,1,1).p("AzKFqQh5psFFj8QFFj8QMBlQQMBliCFcQgqBomegUIiiBNQi4BniaA+QibA9iRDrQiTDrhGASQg2AeifgCQl5gEmYlFg");
	this.shape_511.setTransform(137.5516,179.7863);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#3358B8").s().p("Am5KzQl5gEmYlFQh5psFFj8QFFj8QMBlQQMBliCFcQgqBomegUIiiBNQi4BniaA+QibA9iRDrQiTDrhGASQgyAciPAAIgUAAg");
	this.shape_512.setTransform(137.5516,179.7863);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f().s("#000000").ss(2,1,1).p("AzLFqQh6psFFj8QFFj8QMBlQQNBlh+FRQgpBrmkgSIiiBTQi/B1iXA4QiYA4iQDpQiSDqhGASQg2AeifgCQl6gEmXlFg");
	this.shape_513.setTransform(137.7496,179.7863);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#3358B8").s().p("Am6KzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlh+FRQgpBrmlgSIihBTQi/B1iYA4QiXA4iRDpQiRDqhHASQgyAciPAAIgTAAg");
	this.shape_514.setTransform(137.7496,179.7863);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f().s("#000000").ss(2,1,1).p("AzeFqQGYFFF5AEQCfACA2geQBGgSCRjoQCQjpCUgyQCVgyDHiDICghZQGrAPAohsQB5lHwNhlQwLhllFD8");
	this.shape_515.setTransform(139.581,179.7861);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#3358B8").s().p("Am8KzQl6gEmXlFQh6psFFj8QFFj8QMBlQQNBlh5FHQgoBsmsgPIigBZQjHCDiUAyQiUAyiQDpQiRDohGASQgzAciNAAIgVAAg");
	this.shape_516.setTransform(137.9244,179.7861);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f().s("#000000").ss(2,1,1).p("AhPAtICfhZ");
	this.shape_517.setTransform(208.25,170.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.shape_274},{t:this.shape_273}]},39).to({state:[{t:this.shape_276},{t:this.shape_275}]},20).to({state:[{t:this.shape_278},{t:this.shape_277}]},1).to({state:[{t:this.shape_280},{t:this.shape_279}]},1).to({state:[{t:this.shape_282},{t:this.shape_281}]},1).to({state:[{t:this.shape_284},{t:this.shape_283}]},1).to({state:[{t:this.shape_286},{t:this.shape_285}]},1).to({state:[{t:this.shape_288},{t:this.shape_287}]},1).to({state:[{t:this.shape_290},{t:this.shape_289}]},1).to({state:[{t:this.shape_292},{t:this.shape_291}]},1).to({state:[{t:this.shape_294},{t:this.shape_293}]},1).to({state:[{t:this.shape_296},{t:this.shape_295}]},1).to({state:[{t:this.shape_298},{t:this.shape_297}]},1).to({state:[{t:this.shape_300},{t:this.shape_299}]},1).to({state:[{t:this.shape_302},{t:this.shape_301}]},1).to({state:[{t:this.shape_304},{t:this.shape_303}]},1).to({state:[{t:this.shape_306},{t:this.shape_305}]},1).to({state:[{t:this.shape_308},{t:this.shape_307}]},1).to({state:[{t:this.shape_310},{t:this.shape_309}]},1).to({state:[{t:this.shape_312},{t:this.shape_311}]},1).to({state:[{t:this.shape_314},{t:this.shape_313}]},1).to({state:[{t:this.shape_316},{t:this.shape_315}]},1).to({state:[{t:this.shape_318},{t:this.shape_317}]},1).to({state:[{t:this.shape_320},{t:this.shape_319}]},1).to({state:[{t:this.shape_322},{t:this.shape_321}]},1).to({state:[{t:this.shape_324},{t:this.shape_323}]},1).to({state:[{t:this.shape_326},{t:this.shape_325}]},1).to({state:[{t:this.shape_328},{t:this.shape_327}]},1).to({state:[{t:this.shape_330},{t:this.shape_329}]},1).to({state:[{t:this.shape_332},{t:this.shape_331}]},1).to({state:[{t:this.shape_334},{t:this.shape_333}]},1).to({state:[{t:this.shape_336},{t:this.shape_335}]},1).to({state:[{t:this.shape_338},{t:this.shape_337}]},1).to({state:[{t:this.shape_340},{t:this.shape_339}]},1).to({state:[{t:this.shape_342},{t:this.shape_341}]},1).to({state:[{t:this.shape_344},{t:this.shape_343}]},1).to({state:[{t:this.shape_346},{t:this.shape_345}]},1).to({state:[{t:this.shape_348},{t:this.shape_347}]},1).to({state:[{t:this.shape_350},{t:this.shape_349}]},1).to({state:[{t:this.shape_352},{t:this.shape_351}]},1).to({state:[{t:this.shape_354},{t:this.shape_353}]},1).to({state:[{t:this.shape_356},{t:this.shape_355}]},1).to({state:[{t:this.shape_358},{t:this.shape_357}]},1).to({state:[{t:this.shape_360},{t:this.shape_359}]},1).to({state:[{t:this.shape_362},{t:this.shape_361}]},1).to({state:[{t:this.shape_364},{t:this.shape_363}]},1).to({state:[{t:this.shape_366},{t:this.shape_365}]},1).to({state:[{t:this.shape_368},{t:this.shape_367}]},1).to({state:[{t:this.shape_370},{t:this.shape_369}]},1).to({state:[{t:this.shape_372},{t:this.shape_371}]},1).to({state:[{t:this.shape_374},{t:this.shape_373}]},1).to({state:[{t:this.shape_376},{t:this.shape_375}]},1).to({state:[{t:this.shape_378},{t:this.shape_377}]},1).to({state:[{t:this.shape_380},{t:this.shape_379}]},1).to({state:[{t:this.shape_382},{t:this.shape_381}]},1).to({state:[{t:this.shape_384},{t:this.shape_383}]},1).to({state:[{t:this.shape_386},{t:this.shape_385}]},1).to({state:[{t:this.shape_388},{t:this.shape_387}]},1).to({state:[{t:this.shape_390},{t:this.shape_389}]},1).to({state:[{t:this.shape_392},{t:this.shape_391}]},1).to({state:[{t:this.shape_394},{t:this.shape_393}]},1).to({state:[{t:this.shape_396},{t:this.shape_395}]},1).to({state:[{t:this.shape_398},{t:this.shape_397}]},1).to({state:[{t:this.shape_400},{t:this.shape_399}]},1).to({state:[{t:this.shape_402},{t:this.shape_401}]},1).to({state:[{t:this.shape_404},{t:this.shape_403}]},1).to({state:[{t:this.shape_406},{t:this.shape_405}]},1).to({state:[{t:this.shape_408},{t:this.shape_407}]},1).to({state:[{t:this.shape_410},{t:this.shape_409}]},1).to({state:[{t:this.shape_412},{t:this.shape_411}]},1).to({state:[{t:this.shape_414},{t:this.shape_413}]},1).to({state:[{t:this.shape_416},{t:this.shape_415}]},1).to({state:[{t:this.shape_418},{t:this.shape_417}]},1).to({state:[{t:this.shape_420},{t:this.shape_419}]},1).to({state:[{t:this.shape_422},{t:this.shape_421}]},1).to({state:[{t:this.shape_424},{t:this.shape_423}]},1).to({state:[{t:this.shape_426},{t:this.shape_425}]},1).to({state:[{t:this.shape_428},{t:this.shape_427}]},1).to({state:[{t:this.shape_430},{t:this.shape_429}]},1).to({state:[{t:this.shape_432},{t:this.shape_431}]},1).to({state:[{t:this.shape_434},{t:this.shape_433}]},1).to({state:[{t:this.shape_436},{t:this.shape_435}]},1).to({state:[{t:this.shape_438},{t:this.shape_437}]},1).to({state:[{t:this.shape_440},{t:this.shape_439}]},1).to({state:[{t:this.shape_442},{t:this.shape_441}]},1).to({state:[{t:this.shape_444},{t:this.shape_443}]},1).to({state:[{t:this.shape_446},{t:this.shape_445}]},1).to({state:[{t:this.shape_448},{t:this.shape_447}]},1).to({state:[{t:this.shape_450},{t:this.shape_449}]},1).to({state:[{t:this.shape_452},{t:this.shape_451}]},1).to({state:[{t:this.shape_454},{t:this.shape_453}]},1).to({state:[{t:this.shape_456},{t:this.shape_455}]},1).to({state:[{t:this.shape_458},{t:this.shape_457}]},1).to({state:[{t:this.shape_460},{t:this.shape_459}]},1).to({state:[{t:this.shape_462},{t:this.shape_461}]},1).to({state:[{t:this.shape_464},{t:this.shape_463}]},1).to({state:[{t:this.shape_466},{t:this.shape_465}]},1).to({state:[{t:this.shape_468},{t:this.shape_467}]},1).to({state:[{t:this.shape_470},{t:this.shape_469}]},1).to({state:[{t:this.shape_472},{t:this.shape_471}]},1).to({state:[{t:this.shape_474},{t:this.shape_473}]},1).to({state:[{t:this.shape_476},{t:this.shape_475}]},1).to({state:[{t:this.shape_478},{t:this.shape_477}]},1).to({state:[{t:this.shape_480},{t:this.shape_479}]},1).to({state:[{t:this.shape_482},{t:this.shape_481}]},1).to({state:[{t:this.shape_484},{t:this.shape_483}]},1).to({state:[{t:this.shape_486},{t:this.shape_485}]},1).to({state:[{t:this.shape_488},{t:this.shape_487}]},1).to({state:[{t:this.shape_490},{t:this.shape_489}]},1).to({state:[{t:this.shape_492},{t:this.shape_491}]},1).to({state:[{t:this.shape_494},{t:this.shape_493}]},1).to({state:[{t:this.shape_496},{t:this.shape_495}]},1).to({state:[{t:this.shape_498},{t:this.shape_497}]},1).to({state:[{t:this.shape_500},{t:this.shape_499}]},1).to({state:[{t:this.shape_502},{t:this.shape_501}]},1).to({state:[{t:this.shape_504},{t:this.shape_503}]},1).to({state:[{t:this.shape_506},{t:this.shape_505}]},1).to({state:[{t:this.shape_508},{t:this.shape_507}]},1).to({state:[{t:this.shape_510},{t:this.shape_509}]},1).to({state:[{t:this.shape_512},{t:this.shape_511}]},1).to({state:[{t:this.shape_514},{t:this.shape_513}]},1).to({state:[{t:this.shape_516},{t:this.shape_515}]},1).to({state:[{t:this.shape_517}]},10).wait(41));
	this.timeline.addTween(cjs.Tween.get(instance_5Filter_4).wait(191));

	// Hand
	this.instance_6 = new lib.补间12("synched",0);
	this.instance_6.setTransform(250.7,168.75);
	this.instance_6._off = true;

	this.instance_7 = new lib.补间13("synched",0);
	this.instance_7.setTransform(266.35,164.55);
	this.instance_7._off = true;

	this.instance_8 = new lib.补间14("synched",0);
	this.instance_8.setTransform(275.15,154.6);
	this.instance_8._off = true;

	this.instance_9 = new lib.补间15("synched",0);
	this.instance_9.setTransform(275.45,156.95);

	this.instance_10 = new lib.补间16("synched",0);
	this.instance_10.setTransform(278.25,165.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},119).to({state:[{t:this.instance_7}]},30).to({state:[{t:this.instance_8}]},30).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_10}]},5).wait(41));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(119).to({_off:false},0).to({_off:true,x:266.35,y:164.55},30).wait(81));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(119).to({_off:false},30).to({_off:true,x:275.15,y:154.6},30).wait(51));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(149).to({_off:false},30).to({_off:true,x:275.45,y:156.95},5).wait(46));

	// Bed
	this.instance_11 = new lib.枕头("synched",0);
	this.instance_11.setTransform(187.4,220.8,1,1,0,0,0,69.7,34);
	var instance_11Filter_5 = new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0);
	this.instance_11.filters = [instance_11Filter_5];
	this.instance_11.cache(-3,-3,145,74);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f().s("#000000").ss(2,1,1).p("A2KAZQJTE0KqCzQMJjZL8mcQAZgXgHgiQgIgihghIQhhhHlvig");
	this.shape_518.setTransform(156.6153,234.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_518},{t:this.instance_11}]}).to({state:[{t:this.shape_518},{t:this.instance_11}]},39).to({state:[{t:this.shape_518},{t:this.instance_11}]},150).wait(41));
	this.timeline.addTween(cjs.Tween.get(instance_11Filter_5).wait(39).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(150).to(new cjs.ColorFilter(0.4,0.4,0.4,1,0,0,0,0), 0).wait(41));

	// Background
	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f().s("#000000").ss(2,1,1).p("A/U3fMA+pAAAMAAAAu/Mg+pAAAg");
	this.shape_519.setTransform(200.525,149.9);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("A/UXfMAAAgu+MA+pAAAMAAAAu+g");
	this.shape_520.setTransform(200.525,149.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_520},{t:this.shape_519}]},39).to({state:[{t:this.shape_520},{t:this.shape_519}]},20).to({state:[{t:this.shape_520},{t:this.shape_519}]},30).to({state:[{t:this.shape_520},{t:this.shape_519}]},30).to({state:[{t:this.shape_520},{t:this.shape_519}]},30).to({state:[{t:this.shape_520},{t:this.shape_519}]},30).to({state:[]},10).wait(41));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_3, startFrame:119, endFrame:119, x:-29, y:-29, w:57, h:57});
	this.filterCacheList.push({instance: this.instance_3, startFrame:184, endFrame:184, x:-29, y:-29, w:57, h:57});
	this.filterCacheList.push({instance: this.instance_3, startFrame:189, endFrame:189, x:-29, y:-29, w:57, h:57});
	this.filterCacheList.push({instance: this.instance_4, startFrame:189, endFrame:189, x:-2, y:-3, w:258, h:144});
	this.filterCacheList.push({instance: this.instance_11, startFrame:39, endFrame:39, x:-3, y:-3, w:145, h:74});
	this.filterCacheList.push({instance: this.instance_11, startFrame:0, endFrame:0, x:-3, y:-3, w:145, h:74});
	this.filterCacheList.push({instance: this.instance_11, startFrame:189, endFrame:189, x:-3, y:-3, w:145, h:74});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(199.1,139.6,202.9,161.70000000000002);
// library properties:
lib.properties = {
	id: '37B269EF2F96DB42B76FA0BCC98885DB',
	width: 400,
	height: 300,
	fps: 24,
	color: "#666666",
	opacity: 1.00,
	manifest: [
		{src:"sounds/_113636__edgardedition__click6wav.mp3", id:"_113636__edgardedition__click6wav"},
		{src:"sounds/_172359__avakas__gettingupfrombedwav.mp3", id:"_172359__avakas__gettingupfrombedwav"},
		{src:"sounds/_89534__cgeffex__veryfastbubblepop1.mp3", id:"_89534__cgeffex__veryfastbubblepop1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['37B269EF2F96DB42B76FA0BCC98885DB'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;