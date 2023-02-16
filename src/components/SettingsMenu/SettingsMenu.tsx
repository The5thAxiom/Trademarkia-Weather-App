import * as MaterialDesign from 'react-icons/md';
import * as SimpleIcons from 'react-icons/si';
import OutboundLink from '../OutboundLink';

import './SettingsMenu.css';

interface SettingsMenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsMenu({ isOpen, setIsOpen }: SettingsMenuProps) {
    return (
        <div id='settings'>
            <div id='settings-content'>
                <button className='close' onClick={() => setIsOpen(false)}>
                    <MaterialDesign.MdClose />
                </button>
                {/* <div className='title'>Settings</div>
                <section>
                    <div>Temperature unit</div> <button>&deg; C</button>
                    <div>Speed unit</div> <button>&deg; kph</button>
                </section> */}
                <div className='title'>About</div>
                <div>Made by Samridh Anand Paatni for Trademarkia</div>
                <section>
                    <div>Website</div>
                    <OutboundLink href='https://www.samridh.live/'>
                        <SimpleIcons.SiInternetexplorer />
                    </OutboundLink>
                    <div>Github</div>
                    <OutboundLink href='https://github.com/The5thAxiom'>
                        <SimpleIcons.SiGithub />
                    </OutboundLink>
                    <div>LinkedIn</div>
                    <OutboundLink href='https://www.linkedin.com/in/samridh-anand-paatni-57a045215/'>
                        <SimpleIcons.SiLinkedin />
                    </OutboundLink>
                    <div>Instagram</div>
                    <OutboundLink href='https://www.instagram.com/'>
                        <SimpleIcons.SiInstagram />
                    </OutboundLink>
                </section>
            </div>
        </div>
    );
}
