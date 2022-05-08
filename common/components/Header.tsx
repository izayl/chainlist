import { Link, Spacer, useTheme } from '@geist-ui/react'
import NextLink from 'next/link'
import { useLocale } from '../hooks/useLocale'

const Header: React.FC = () => {
  const t = useLocale()
  const theme = useTheme()
  return (
    <header>
      <div className="header">
        <NextLink href="/">
          <div className="logo">
            <img src="/images/logo.svg" />
            <span>{t('AppName')}</span>
          </div>
        </NextLink>
        <nav>
          <NextLink href="https://faucet.paradigm.xyz/">
            <Link block>
              <a target="_blank" rel="noopener noreferrer">
              Faucet
              </a>
            </Link>
          </NextLink>
          <Spacer w={3}/>
          <NextLink href="https://github.com/izayl/evm-box">
            <Link block>
              <a target="_blank" rel="noopener noreferrer">
              Github
              </a>
            </Link>
          </NextLink>
        </nav>
      </div>
      <style jsx>{`
        header {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 12;
        }
        .header {
          max-width: 1000px;
          width: 100%;
          padding: 0 16pt;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
        }

        nav a {
          color: #000;
          cursor: pointer;
        }

        .logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .logo img {
          width: 32px;
          height: 32px;
        }

        .logo span {
          font-size: 1.125rem;
          font-weight: 500;
          margin-left: 1em;
        }

         @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
            nav {
              display: none;
            }
          }
      `}</style>
    </header>
  )
}

export default Header
