import Image from "next/image";

import NorthEastIcon from "@mui/icons-material/NorthEastRounded";
import NorthWestIcon from "@mui/icons-material/NorthWestRounded";
import SouthEastIcon from "@mui/icons-material/SouthEastRounded";
import SouthWestIcon from "@mui/icons-material/SouthWestRounded";

import Community from "@mui/icons-material/Diversity3Rounded";
import Learn from "@mui/icons-material/SchoolRounded";
import Educate from "@mui/icons-material/RecordVoiceOverRounded";
import Code from "@mui/icons-material/CodeRounded";

import Link from "next/link";

export default function Home() {
  const openBox = "/images/openBox.png";
  return (
    <section className="flex-col flex justify-center items-center w-full h-full">
      <div className="flex items-center gap-20 ">
        <div className="flex flex-col gap-20 justify-center items-center">
          <h1>LEARN</h1>
          <Link href={"/deblackboxing/learn"}>
            <Learn fontSize="large" style={{ scale: 5 }} />
          </Link>
          <slot className="br-lg" />
          <h1>EDUCATE</h1>
          <Link href={"/deblackboxing/educate"}>
            <Educate fontSize="large" style={{ scale: 5 }} />
          </Link>
        </div>
        <div className="flex flex-col gap-12">
          <NorthWestIcon fontSize="large" />
          <SouthWestIcon fontSize="large" />
        </div>
        <div className="flex flex-col gap-20 justify-center items-center w-96">
          <h1>DE-BLACKBOXING</h1>
          <Image
            priority
            src={openBox}
            height={300}
            width={300}
            alt="Epistemic Object: The medium is the message - Marshall McLuhan" //https://en.wikipedia.org/wiki/The_medium_is_the_message
          />
        </div>
        <div className="flex flex-col gap-12">
          <NorthEastIcon fontSize="large" />
          <SouthEastIcon fontSize="large" />
        </div>
        <div className="flex flex-col gap-20 justify-center items-center">
          <h1>ENGAGE</h1>
          <Link href={"/deblackboxing/engage"}>
            <Community fontSize="large" style={{ scale: 5 }} />
          </Link>
          <slot className="br-lg" />
          <h1>BUILD</h1>
          <Link href={"/deblackboxing/build"}>
            <Code fontSize="large" style={{ scale: 5 }} />
          </Link>
        </div>
        {/* <Image priority src={comunity} height={300} width={300}  /> */}
      </div>
    </section>
  );
}
