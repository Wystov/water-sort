import { observer } from 'mobx-react-lite';

import { LinkOK } from '@/components/UI/LinkOK';
import { PERK_DESCRIPTION } from '@/constants';

import styles from './Help.module.scss';

export const Help = observer(function Help() {
  return (
    <main className={styles.container}>
      <div>
        <h2>About</h2>
        <p>
          Water Sort Puzzle is a fun and addictive game that will test your
          logic and puzzle-solving skills. Your objective is to sort the colored
          water in the glasses until all glasses contain water of only one
          color. This game is perfect for relaxing your mind and exercising your
          brain at the same time.
        </p>
        <h2>How to Play</h2>
        <ol>
          <li>Tap on any not empty glass from witch you want to pour from.</li>
          <li>
            Only water of the same color can be poured on top of another.
            Additionally, the glass must have enough space to accommodate the
            water.
          </li>
          <li>Continue untill all glasses contain water of only one color.</li>
          <li>Earn coins by completing levels</li>
          <li>
            Use coins to buy special abilities in the shop. This will help you
            to progress on harder levels
          </li>
          <li>
            Game becomes too hard? Start over from level 1 without losing coins
            or abilities. Go to your profile page and press &apos;Reset
            progress&apos; button.
          </li>
          <li>
            Game saves automatically to your device. If you want to continue on
            another device without loosing progress, go to profile page, sign in
            with google account and save game to the cloud. On another device
            you can sign in with same account and load previously saved game.
          </li>
        </ol>
        <h2>Abilities</h2>
        <ul className={styles.listWithIcons}>
          {Object.entries(PERK_DESCRIPTION).map(([key, perk]) => (
            <li key={key} className={styles.listItemWithIcon}>
              {perk.getIcon()} {perk.description}
            </li>
          ))}
        </ul>
      </div>
      <LinkOK />
    </main>
  );
});
