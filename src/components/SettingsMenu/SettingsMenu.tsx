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
                <div className='top'>
                    <button onClick={() => setIsOpen(false)}>
                        <MaterialDesign.MdClose />
                    </button>
                </div>
                <div className='title'>Settings</div>
                <section>
                    <div>Temperature unit</div> <button>&deg; C</button>
                    <div>Speed unit</div> <button>&deg; kph</button>
                </section>
                <div className='title'>About</div>Made by Samridh Anand Paatni
                <section>
                    <div>Website</div>
                    <button>
                        <SimpleIcons.SiInternetexplorer />
                    </button>
                    <div>Github</div>
                    <button>
                        <SimpleIcons.SiGithub />
                    </button>
                    <div>LinkedIn</div>
                    <button>
                        <SimpleIcons.SiLinkedin />
                    </button>
                    <div>Instagram</div>
                    <button>
                        <SimpleIcons.SiInstagram />
                    </button>
                </section>
            </div>
        </div>
    );
}
