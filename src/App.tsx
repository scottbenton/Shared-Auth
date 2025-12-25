import { Container } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <Container maxW="breakpoint-md">
      <Header />
      <Routes />
    </Container>
  );
}

export default App;
