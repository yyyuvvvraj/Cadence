import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const ComparisonTool = ({ onCompare }) => {
  const [comparisonType, setComparisonType] = useState("users");
  const [selectedItems, setSelectedItems] = useState({
    item1: "",
    item2: "",
  });

  const userOptions = [
    { value: "user1", label: "John Doe (john.doe@company.com)" },
    { value: "user2", label: "Sarah Smith (sarah.smith@company.com)" },
    { value: "user3", label: "Michael Chen (michael.chen@company.com)" },
    { value: "user4", label: "Emily Johnson (emily.johnson@company.com)" },
  ];

  const groupOptions = [
    { value: "executives", label: "Executives" },
    { value: "developers", label: "Developers" },
    { value: "support", label: "Support Team" },
    { value: "sales", label: "Sales Team" },
  ];

  const periodOptions = [
    { value: "week1", label: "Week 1 (Jan 1-7, 2026)" },
    { value: "week2", label: "Week 2 (Jan 8-14, 2026)" },
    { value: "week3", label: "Week 3 (Jan 15-21, 2026)" },
    { value: "week4", label: "Week 4 (Jan 22-28, 2026)" },
  ];

  const comparisonTypeOptions = [
    { value: "users", label: "Compare Users" },
    { value: "groups", label: "Compare Groups" },
    { value: "periods", label: "Compare Time Periods" },
  ];

  const getOptionsForType = () => {
    switch (comparisonType) {
      case "users":
        return userOptions;
      case "groups":
        return groupOptions;
      case "periods":
        return periodOptions;
      default:
        return [];
    }
  };

  const handleCompare = () => {
    if (selectedItems?.item1 && selectedItems?.item2 && onCompare) {
      onCompare({
        type: comparisonType,
        items: selectedItems,
      });
    }
  };

  const canCompare =
    selectedItems?.item1 &&
    selectedItems?.item2 &&
    selectedItems?.item1 !== selectedItems?.item2;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="GitCompare" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Comparison Tool
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Side-by-side behavioral analysis
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Comparison Type"
          options={comparisonTypeOptions}
          value={comparisonType}
          onChange={(value) => {
            setComparisonType(value);
            setSelectedItems({ item1: "", item2: "" });
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="First Selection"
            options={getOptionsForType()}
            value={selectedItems?.item1}
            onChange={(value) =>
              setSelectedItems({ ...selectedItems, item1: value })
            }
            searchable
          />

          <Select
            label="Second Selection"
            options={getOptionsForType()}
            value={selectedItems?.item2}
            onChange={(value) =>
              setSelectedItems({ ...selectedItems, item2: value })
            }
            searchable
          />
        </div>

        <Button
          variant="default"
          fullWidth
          iconName="GitCompare"
          iconPosition="left"
          disabled={!canCompare}
          onClick={handleCompare}
        >
          Generate Comparison
        </Button>

        {canCompare && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-accent)" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Comparison Ready
                </h4>
                <p className="text-xs text-muted-foreground caption">
                  Click "Generate Comparison" to view detailed side-by-side
                  analysis including behavioral patterns, confidence scores, and
                  anomaly trends.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTool;
