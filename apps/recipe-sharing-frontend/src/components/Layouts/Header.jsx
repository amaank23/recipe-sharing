import ContainerLayout from "../Containers/ContainerLayout";
import CompanyLogo from "./CompanyLogo";
import MainActions from "./MainActions";
import SearchByLocation from "./SearchByLocation";

const Header = () => {
  return (
    <div className="bg-white">
      <ContainerLayout>
        <div className="flex justify-between items-center flex-col gap-5 lg:gap-0 lg:flex-row mt-2 pt-1 pb-2">
          <CompanyLogo />
          <SearchByLocation />
          <MainActions />
        </div>
      </ContainerLayout>
    </div>
  );
};

export default Header;
