import React from 'react';
import {Composition} from 'remotion';
import './dl/fonts';
import {PILOT_FRAMES, Piloto} from './episodes/internet-muerto-piloto/Piloto';
import {EPISODE_FRAMES, Episode} from './episodes/internet-muerto/Episode';

/** Formato oficial Datologo 7.0: 1080 × 1200 (9:10) · 30 fps */
export const W = 1080;
export const H = 1200;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="InternetMuerto" component={Episode} width={W} height={H} fps={30} durationInFrames={EPISODE_FRAMES} />
    <Composition id="PilotoInternetMuerto" component={Piloto} width={W} height={H} fps={30} durationInFrames={PILOT_FRAMES} />
  </>
);
