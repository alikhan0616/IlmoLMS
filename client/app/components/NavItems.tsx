import Link from "next/link";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const NavItems = ({
  activeItem,
  isMobile,
}: {
  activeItem: number;
  isMobile: boolean;
}) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link className="" key={index} href={item.url}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-lg px-6 font-Poppins font-normal transition-colors duration-200`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link key={index} href={item.url}>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-orangeali text-red-600"
                        : "dark:text-white text-black"
                    } text-lg px-6 font-Poppins font-normal block py-2 transition-colors duration-200`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
