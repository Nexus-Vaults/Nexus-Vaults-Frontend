import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-12 w-full bg-purple h-6">
        <Link
          className="cols-span-1 col-end-13"
          href="https://github.com/Nexus-Vaults/Nexus-Vaults-Frontend"
        >
          <GitHubIcon className="float-right" />
        </Link>
      </div>
    </>
  );
};

export default Footer;