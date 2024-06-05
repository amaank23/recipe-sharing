const AboutStats = () => {
  return (
    <div className="grid grid-cols-3 mb-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Posts</h4>
        <span className="font-semibold text-[#2D3139] text-center">1.3K</span>
      </div>
      <div className="flex flex-col gap-2 border-l border-r border-[#E2E2E2]">
        <h4 className="text-sm text-center text-[#9D9DAF]">Recipes</h4>
        <span className="font-semibold text-[#2D3139] text-center">1.3K</span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm text-center text-[#9D9DAF]">Friends</h4>
        <span className="font-semibold text-[#2D3139] text-center">400</span>
      </div>
    </div>
  );
};

export default AboutStats;
