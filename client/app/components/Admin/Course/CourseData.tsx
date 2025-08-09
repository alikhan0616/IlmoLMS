import { styles } from "@/app/styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: any) => void;
};
const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrequisites = [...prerequisites];
    updatedPrequisites[index].title = value;
    setPrerequisites(updatedPrequisites);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOption = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields to continue!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div className="">
        <label className={`${styles.label} text-[20px]`}>
          What are the benefits students will get from this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to handle state management..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div className="">
        <label className={`${styles.label} text-[20px]`}>
          What are the prerequisites students will require to take this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisite"
            placeholder="Basic knowledge of React..."
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => prevButton()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] cursor-pointer bg-[#37a39a] text-center text-[#fff] rounded mt-8"
        >
          Prev
        </div>
        <div
          onClick={() => handleOption()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] cursor-pointer bg-[#37a39a] text-center text-[#fff] rounded mt-8"
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
