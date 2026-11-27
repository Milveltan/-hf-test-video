import React from 'react';
import {Composition} from 'remotion';
import './dl/fonts';
import {PILOT_FRAMES, Piloto} from './episodes/internet-muerto-piloto/Piloto';
import {EPISODE_FRAMES, Episode} from './episodes/internet-muerto/Episode';
import {CLIPS} from './clips';
import {EPISODE_FRAMES as CR_FRAMES, Episode as ContenerRespiracion} from './episodes/contener-respiracion/Episode';
import {EPISODE_FRAMES as SD_FRAMES, Episode as SacudidaDormir} from './episodes/sacudida-al-dormir/Episode';
import {EPISODE_FRAMES as OP_FRAMES, Episode as OlvidoPuerta} from './episodes/olvido-puerta/Episode';
import {EPISODE_FRAMES as SN_FRAMES, Episode as SinDormir} from './episodes/sin-dormir/Episode';
import {EPISODE_FRAMES as SNL_FRAMES, Episode as SinDormirLargo} from './episodes/sin-dormir-largo/Episode';
import {EPISODE_FRAMES as HP_FRAMES, Episode as HuevoProhibido} from './episodes/huevo-prohibido/Episode';
import {EPISODE_FRAMES as SC_FRAMES, Episode as SuenoComer} from './episodes/sueno-comer/Episode';
import {EPISODE_FRAMES as BZ_FRAMES, Episode as Bostezo} from './episodes/bostezo/Episode';
import {Piloto as PilotoFosa} from './episodes/piloto-fosa/Piloto';
import {FRAMES as PF_FRAMES} from './episodes/piloto-fosa/world';
import {EPISODE_FRAMES as OL_FRAMES, Episode as OlaLituya} from './episodes/ola-lituya/Episode';
import {EPISODE_FRAMES as AF_FRAMES, Episode as Autofagia} from './episodes/autofagia/Episode';
import {Showcase} from './catalog/Showcase';

/** Formato oficial Datologo 7.0: 1080 × 1200 (9:10) · 30 fps */
export const W = 1080;
export const H = 1200;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="InternetMuerto" component={Episode} width={W} height={H} fps={30} durationInFrames={EPISODE_FRAMES} />
    <Composition id="ContenerRespiracion" component={ContenerRespiracion} width={W} height={H} fps={30} durationInFrames={CR_FRAMES} />
    <Composition id="SacudidaDormir" component={SacudidaDormir} width={W} height={H} fps={30} durationInFrames={SD_FRAMES} />
    <Composition id="OlvidoPuerta" component={OlvidoPuerta} width={W} height={H} fps={30} durationInFrames={OP_FRAMES} />
    <Composition id="SinDormir" component={SinDormir} width={W} height={H} fps={30} durationInFrames={SN_FRAMES} />
    <Composition id="SinDormirLargo" component={SinDormirLargo} width={W} height={H} fps={30} durationInFrames={SNL_FRAMES} />
    <Composition id="HuevoProhibido" component={HuevoProhibido} width={W} height={H} fps={30} durationInFrames={HP_FRAMES} />
    <Composition id="SuenoComer" component={SuenoComer} width={W} height={H} fps={30} durationInFrames={SC_FRAMES} />
    <Composition id="Bostezo" component={Bostezo} width={W} height={H} fps={30} durationInFrames={BZ_FRAMES} />
    <Composition id="PilotoFosa" component={PilotoFosa} width={W} height={H} fps={30} durationInFrames={PF_FRAMES} />
    <Composition id="OlaLituya" component={OlaLituya} width={W} height={H} fps={30} durationInFrames={OL_FRAMES} />
    <Composition id="Autofagia" component={Autofagia} width={W} height={H} fps={30} durationInFrames={AF_FRAMES} />
    <Composition id="PilotoInternetMuerto" component={Piloto} width={W} height={H} fps={30} durationInFrames={PILOT_FRAMES} />
    <Composition id="Catalogo" component={Showcase} width={W} height={H} fps={30} durationInFrames={60} defaultProps={{piece: 'HumanRig-idle'}} />
    {CLIPS.map((c) => (
      <Composition key={c.id} id={`Clip-${c.id}`} component={c.component} width={W} height={H} fps={30} durationInFrames={c.frames} />
    ))}
  </>
);
