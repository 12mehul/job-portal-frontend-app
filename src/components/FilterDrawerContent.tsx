import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { grey } from "@mui/material/colors";
import { IFilterJobs } from "../interface/IFilterJobs";

interface IDrawerContentProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  onApplyFilters: (filters: any) => void;
}

const FilterDrawerContent = ({
  toggleDrawer,
  onApplyFilters,
}: IDrawerContentProps) => {
  const [formObj, setFormObj] = useState<IFilterJobs>({
    fullTimeJob: false,
    partTimeJob: false,
    wfhJob: false,
    salaryMin: 0,
    salaryMax: 100000,
    duration: "0",
    salaryAesc: false,
    salaryDesc: false,
    durationAesc: false,
    durationDesc: false,
    ratingAesc: false,
    ratingDesc: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormObj((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFormObj((prevState) => ({
      ...prevState,
      salaryMin: min,
      salaryMax: max,
    }));
  };

  const handleDurationChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormObj((prevState) => ({
      ...prevState,
      duration: value,
    }));
  };

  const handleApply = () => {
    const filters = {
      fullTime: formObj.fullTimeJob,
      partTime: formObj.partTimeJob,
      wfh: formObj.wfhJob,
      salaryMin: formObj.salaryMin,
      salaryMax: formObj.salaryMax,
      duration: formObj.duration,
      asc: {
        salary: formObj.salaryAesc,
        duration: formObj.durationAesc,
        rating: formObj.ratingAesc,
      },
      desc: {
        salary: formObj.salaryDesc,
        duration: formObj.durationDesc,
        rating: formObj.ratingDesc,
      },
    };
    onApplyFilters(filters); // Call parent handler
  };

  return (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <FormGroup>
        <Grid2
          margin={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: "18px", fontWeight: 600 }}
          >
            Job Type
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", width: "500px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="fullTimeJob"
                  checked={formObj.fullTimeJob}
                  onChange={handleCheckboxChange}
                />
              }
              label="Full Time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="partTimeJob"
                  checked={formObj.partTimeJob}
                  onChange={handleCheckboxChange}
                />
              }
              label="Part Time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wfhJob"
                  checked={formObj.wfhJob}
                  onChange={handleCheckboxChange}
                />
              }
              label="Work From Home"
            />
          </Box>
        </Grid2>
        <Divider />
        <Grid2
          margin={3}
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "50px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: "18px", fontWeight: 600 }}
          >
            Salary
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Slider
              getAriaLabel={() => "Salary range"}
              value={[formObj.salaryMin, formObj.salaryMax]}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">{`${formObj.salaryMin}`}</Typography>
              <Typography variant="body2">{`${formObj.salaryMax}`}</Typography>
            </Box>
          </Box>
        </Grid2>
        <Divider />
        <Grid2
          margin={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: "18px", fontWeight: 600 }}
          >
            Duration
          </Typography>
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select
                label="Duration"
                color="primary"
                name="duration"
                value={formObj.duration}
                onChange={handleDurationChange}
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid2>
        <Divider />
        <Grid2
          margin={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: "18px", fontWeight: 600 }}
          >
            Sort
          </Typography>
          <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="salary"
                    checked={formObj.salaryAesc || formObj.salaryDesc}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setFormObj((prevState) => ({
                        ...prevState,
                        salaryAesc: isChecked ? true : false,
                        salaryDesc: false,
                      }));
                    }}
                  />
                }
                label="Salary"
              />
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: grey[100],
                  },
                  padding: "10px",
                  borderRadius: "10px",
                  color: grey[700],
                }}
                disabled={!formObj.salaryAesc && !formObj.salaryDesc}
                onClick={() => {
                  setFormObj((prevState) => ({
                    ...prevState,
                    salaryDesc: !prevState.salaryDesc,
                    salaryAesc: prevState.salaryDesc ? true : false,
                  }));
                }}
              >
                {formObj.salaryDesc ? (
                  <ArrowDownwardIcon fontSize="medium" />
                ) : (
                  <ArrowUpwardIcon fontSize="medium" />
                )}
              </Button>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: "40px",
                marginX: "10px",
                backgroundColor: grey[500],
              }}
            />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="duration"
                    checked={formObj.durationAesc || formObj.durationDesc}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setFormObj((prevState) => ({
                        ...prevState,
                        durationAesc: isChecked ? true : false,
                        durationDesc: false,
                      }));
                    }}
                  />
                }
                label="Duration"
              />
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: grey[100],
                  },
                  padding: "10px",
                  borderRadius: "10px",
                  color: grey[700],
                }}
                disabled={!formObj.durationAesc && !formObj.durationDesc}
                onClick={() => {
                  setFormObj((prevState) => ({
                    ...prevState,
                    durationDesc: !prevState.durationDesc,
                    durationAesc: prevState.durationDesc ? true : false,
                  }));
                }}
              >
                {formObj.durationDesc ? (
                  <ArrowDownwardIcon fontSize="medium" />
                ) : (
                  <ArrowUpwardIcon fontSize="medium" />
                )}
              </Button>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: "40px",
                marginX: "10px",
                backgroundColor: grey[500],
              }}
            />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rating"
                    checked={formObj.ratingAesc || formObj.ratingDesc}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setFormObj((prevState) => ({
                        ...prevState,
                        ratingAesc: isChecked ? true : false,
                        ratingDesc: false,
                      }));
                    }}
                  />
                }
                label="Rating"
              />
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: grey[100],
                  },
                  padding: "10px",
                  borderRadius: "10px",
                  color: grey[700],
                }}
                disabled={!formObj.ratingAesc && !formObj.ratingDesc}
                onClick={() => {
                  setFormObj((prevState) => ({
                    ...prevState,
                    ratingDesc: !prevState.ratingDesc,
                    ratingAesc: prevState.ratingDesc ? true : false,
                  }));
                }}
              >
                {formObj.ratingDesc ? (
                  <ArrowDownwardIcon fontSize="medium" />
                ) : (
                  <ArrowUpwardIcon fontSize="medium" />
                )}
              </Button>
            </Box>
          </Box>
        </Grid2>
        <Grid2
          container
          margin={3}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            type="button"
            size="medium"
            onClick={handleApply}
            sx={{
              padding: "9px 30px",
              fontSize: "15px",
            }}
          >
            Apply
          </Button>
        </Grid2>
      </FormGroup>
    </Box>
  );
};

export default FilterDrawerContent;
