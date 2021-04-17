import * as THREE from "three";

export const Audio = ({ camera }) => {
    
    const listener = new THREE.AudioListener();
    camera.add(this.listener);
    
    const audioLoader = new THREE.AudioLoader();

    // global ambient audio
	var music = new THREE.Audio(this.listener);
	audioLoader.load('./fZero_BigBlue.mp3', function (buffer) {
        music.setBuffer(buffer);
        music.setVolume(0.5);
		music.setLoop(true);
		music.play();
	} );
    
	const shockwave_0 = new THREE.Audio(this.listener);
	audioLoader.load('audio/shockwave_0.wav', function (buffer) {
		shockwave_0.setBuffer(buffer);
	} );

    // shockwave_0.play();
}