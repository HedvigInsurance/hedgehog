import { colorsV3 } from '@hedviginsurance/brand'
import { Logo, LogoIcon } from 'components/shared/navigation/sidebar/elements'
import { Button } from 'hedvig-ui/button'
import { Spacing } from 'hedvig-ui/spacing'
import { Paragraph } from 'hedvig-ui/typography'
import React from 'react'
import styled from 'react-emotion'

const LoginContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  margin: '20px auto',
})

const HeaderContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '1.5rem 0',
  margin: '0 auto',
  marginTop: '12rem',
  flexShrink: 0,
})

const HeaderLogo = styled(Logo)({
  width: '7rem',
  marginRight: 0,
  marginLeft: '0.5rem',
  transition: 'margin 500ms, width 500ms, opacity: 500ms',
  fill: colorsV3.gray100,
})

const HeaderLogoIcon = styled(LogoIcon)({
  width: '1rem',
  fill: colorsV3.gray100,
  transition: 'margin-left 500ms, width 500ms',
})

const CenteredParagraph = styled(Paragraph)({
  color: colorsV3.gray100,
  textAlign: 'center',
})

const CarryOnLink = styled.a`
  &&& {
    color: ${colorsV3.gray100};
    text-decoration: underline;
  }
`

const LoginPage = () => (
  <>
    <HeaderContainer>
      <HeaderLogo />
      <HeaderLogoIcon />
    </HeaderContainer>
    <LoginContainer>
      <CenteredParagraph>This is an internal system.</CenteredParagraph>
      <CenteredParagraph>
        If you found your way here but don't know what this is,{' '}
        <CarryOnLink href={'http://hedvig.com/'}>please carry on</CarryOnLink>.
      </CenteredParagraph>
      <Spacing bottom={'medium'} />
      <Button
        size={'large'}
        halfWidth
        onClick={() =>
          (window.location.href = `${
            (window as any).GATEKEEPER_HOST
          }/sso?redirect=${window.location.protocol}//${
            window.location.host
          }/login/callback`)
        }
        basic
      >
        Sign in
      </Button>
    </LoginContainer>
  </>
)

export default LoginPage
