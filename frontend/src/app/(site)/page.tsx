// app/page.tsx
import TopBar from "@/components/pagina/TopBar/topbar";
import Header from "@/components/pagina/Header/header";
import Banner from "@/components/pagina/Banner_Video/banner_video";
import Ticker from "@/components/pagina/Ticker/ticker";
import About from "@/components/pagina/About/about";
import Opinion from "@/components/pagina/Opinion/opinion";
import Footer from "@/components/pagina/Footer/footer";

export default async function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Banner videoSrc="/assets/banner_video/eagle.mp4" />
      <Ticker />
      <About />
      <Opinion />
      <Footer />
    </>
  )
}