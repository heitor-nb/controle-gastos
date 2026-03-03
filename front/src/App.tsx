import styled, { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import { GlobalStyle } from "./styles/GlobalStyle"
import Nav from "./components/Nav"
import { Outlet } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.surface};
  display: flex;
  flex-wrap: wrap;
`

const TopBottomWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
`

const CenterWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
`

const SideContainer = styled.div`
  height: 100%;
  flex: 1;
  border: solid 1px ${({theme}) => theme.colors.surface};
  background-color: ${({theme}) => theme.colors.background};
`

const CenterContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  height: 100%;
  border: solid 1px ${({theme}) => theme.colors.surface};
  background-color: ${({theme}) => theme.colors.background};
  display: flex;
`

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <TopBottomWrapper>
          <SideContainer style={{borderRadius: "0 0 0.5rem 0"}}/>
          <CenterContainer style={{borderRadius: "0 0 0.5rem 0.5rem"}}/>
          <SideContainer style={{borderRadius: "0 0 0 0.5rem"}}/>
        </TopBottomWrapper>
        <CenterWrapper>
          <SideContainer style={{borderRadius: "0 0.5rem 0.5rem 0"}}/>
          <CenterContainer style={{borderRadius: "0.5rem"}}>
            <Nav />
            <Outlet />
          </CenterContainer>
          <SideContainer style={{borderRadius: "0.5rem 0 0 0.5rem"}}/>
        </CenterWrapper>
        <TopBottomWrapper>
          <SideContainer style={{borderRadius: "0 0.5rem 0 0"}}/>
          <CenterContainer style={{borderRadius: "0.5rem 0.5rem 0 0"}}/>
          <SideContainer style={{borderRadius: "0.5rem 0 0 0"}}/>
        </TopBottomWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default App
