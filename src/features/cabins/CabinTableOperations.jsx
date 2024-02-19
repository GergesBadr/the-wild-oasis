import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";

function CabinTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Filter
        searchParamsField="discount"
        optionsInOrder={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
        whatFor="cabins"
        paramsToBeReset={[{ name: "page", value: 1 }]}
      />
      <Sort
        optionsInOrder={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price (Low first)" },
          { value: "regular_price-desc", label: "Sort by price (High first)" },
          { value: "max_capacity-asc", label: "Sort by capacity (Low first)" },
          {
            value: "max_capacity-desc",
            label: "Sort by capacity (High first)",
          },
        ]}
        whatFor="cabins"
      />
    </div>
  );
}

export default CabinTableOperations;
