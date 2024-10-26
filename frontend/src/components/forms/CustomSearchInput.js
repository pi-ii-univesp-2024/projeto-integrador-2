import { SearchOutlined } from "@mui/icons-material";
import { InputAdornment, OutlinedInput } from "@mui/material";

export default function CustomSearchInput({
  searchValue,
  setSearchValue,
  placeholder = "Busca",
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setSearchValue("");
    }
  };

  return (
    <OutlinedInput
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      value={searchValue}
      size="small"
      onChange={(e) => setSearchValue(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlined />
        </InputAdornment>
      }
    />
  );
}
