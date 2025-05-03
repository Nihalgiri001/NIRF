import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Rankings from "@/pages/rankings";
import Methodology from "@/pages/methodology";
import Parameters from "@/pages/parameters";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SecondRepoPage from './pages/secondRepoPage';
import NirfFinderExplorerPage from './pages/nirfFinderExplorerPage';

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/rankings" component={Rankings} />
        <Route path="/methodology" component={Methodology} />
        <Route path="/parameters" component={Parameters} />
        <Route path="/second-repo" component={SecondRepoPage} />
        <Route path="/nirf-finder-explorer" component={NirfFinderExplorerPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
