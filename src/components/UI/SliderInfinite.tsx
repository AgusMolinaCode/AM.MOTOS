

const LOGOS = [
  <img key="logo1" src="/akra-r.png" alt="logo1" width={700} height={700} />,
  <img key="logo2" src="/cp.jpeg" alt="logo2" width={500} height={500} />,
  <img key="logo3" src="/fmf-r.png" alt="logo3" width={500} height={500} />,
  <img key="logo5" src="/hotcams.png" alt="logo4" width={500} height={500} />,
  <img key="logo6" src="/hotrods-r.png" alt="logo4" width={500} height={500} />,
  <img key="logo7" src="/je-r.png" alt="logo4" width={500} height={500} />,
  <img key="logo8" src="/pro-circuit.png" alt="logo4" width={600} height={600} />,
  <img key="logo9" src="/prox.png" alt="logo4" width={600} height={600} />,
  <img key="logo10" src="/wiseco.webp" alt="logo4" width={700} height={700} />,
  <img key="logo11" src="/yoshimura-r.png" alt="logo4" width={850} height={850} />,
];

export default function SliderInfinite() {
  return (
    <div className="mt-24 relative m-auto  max-w-[1190px] bg-transparent  overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full px-2  before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full  after:-scale-x-100  before:md:w-[200px] before:w-[80px] after:md:w-[200px] after:w-[80px] after:content-['']">
    <div className="animate-infinite-slider flex gap-14 w-[calc(250px*10)]">
        {LOGOS.map((logo) => (
            <div
                className="slide flex w-full  items-center justify-center"
                key={logo.key}
            >
                {logo}
            </div>
        ))}
      </div>
    </div>
  );
};