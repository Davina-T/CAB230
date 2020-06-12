import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

const DropdownBar = ({ setDropdownItem }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const industries = [
    { key: 1, industry: "Consumer Discretionary" },
    { key: 2, industry: "Consumer Staples" },
    { key: 3, industry: "Energy" },
    { key: 4, industry: "Financials" },
    { key: 5, industry: "Health Care" },
    { key: 6, industry: "Industrials" },
    { key: 7, industry: "Information Technology" },
    { key: 8, industry: "Materials" },
    { key: 9, industry: "Real Estate" },
    { key: 10, industry: "Telecommunication Services" },
    { key: 11, industry: "Utilities" },
  ]

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Select Industry</DropdownToggle>
      <DropdownMenu>
        {industries.map((industry) => (
          <DropdownItem
            key={industry.key}
            onClick={() => {
              setDropdownItem(industry.industry)
            }}
          >
            {industry.industry}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownBar
