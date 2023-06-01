import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className="flex flex-row justify-between w-full bg-purple p-2">
        <p className='font-bold'>Farsight CDA UG</p>
        <Link
          target='_blank'
          href="https://github.com/Nexus-Vaults/Nexus-Vaults"
        >
          <GitHubIcon className="float-right h-full w-full" />
        </Link>
      </div>
    </>
  );
};

export default Footer;