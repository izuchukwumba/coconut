import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

interface SelectCollegeProps {
  onCollegeSelect: (college: string) => void;
}
const SelectCollege: React.FC<SelectCollegeProps> = ({ onCollegeSelect }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [college, setCollege] = useState<string>("");
  const [allColleges, setAllColleges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getColleges = async (query = ""): Promise<void> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/data/colleges`, {
        params: { q: query },
      });
      setAllColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  useEffect(() => {
    getColleges();
  }, [BACKEND_URL]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getColleges(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  console.log(college);

  const handleCollegeSelect = (selectedCollege: string) => {
    setCollege(selectedCollege);
    onCollegeSelect(selectedCollege);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {college || "Select college..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search college..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>College not found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {allColleges.map((school, index) => (
                <CommandItem
                  key={index}
                  value={school}
                  onSelect={(currentValue) => {
                    setCollege(currentValue === college ? "" : currentValue);
                    setOpen(false);
                    handleCollegeSelect(school);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      college === school ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {school}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SelectCollege;
