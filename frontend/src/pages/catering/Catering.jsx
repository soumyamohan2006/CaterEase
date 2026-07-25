import CateringPackageCard
  from "../../components/catering/CateringPackageCard";

function Catering() {

  const packages = [
    {
      _id: "1",
      name: "Wedding Premium Package",
      description: "Complete premium wedding catering.",
      price: 1500,
    },
    {
      _id: "2",
      name: "Birthday Package",
      description: "Perfect food package for birthday events.",
      price: 500,
    },
    {
      _id: "3",
      name: "Corporate Package",
      description: "Professional catering for corporate events.",
      price: 800,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">

      <h1 className="text-4xl font-bold">
        Catering Packages
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {packages.map((item) => (
          <CateringPackageCard
            key={item._id}
            packageData={item}
          />
        ))}

      </div>

    </div>
  );
}

export default Catering;