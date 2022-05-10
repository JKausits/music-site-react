import React, { Fragment, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

export class TabProps {
  constructor(
    public id: number,
    public label: React.ReactNode,
    public content: React.ReactNode
  ) {}
}

interface Props {
  activeTabIndex: number;
  tabs: TabProps[];
  onTabIndexChange(index: number): void;
}

const TabContainer: React.FC<Props> = ({
  tabs,
  activeTabIndex,
  onTabIndexChange,
}) => {
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(
    <Fragment></Fragment>
  );
  const renderTab = (tab: TabProps) => {
    return (
      <Nav.Item key={tab.id} onClick={() => onTabIndexChange(tab.id)}>
        <Nav.Link active={activeTabIndex === tab.id} eventKey={tab.id}>
          {tab.label}
        </Nav.Link>
      </Nav.Item>
    );
  };

  useEffect(() => {
    const content = tabs.find((x) => x.id === activeTabIndex)?.content;

    setCurrentContent(content || <Fragment></Fragment>);
  }, [activeTabIndex, setCurrentContent, tabs]);

  return (
    <Fragment>
      <Nav
        variant="tabs"
        onSelect={(key: string | null) =>
          onTabIndexChange(key != null ? +key : 0)
        }
      >
        {tabs.map(renderTab)}
      </Nav>

      <div className="mt-2">{currentContent}</div>
    </Fragment>
  );
};

export default TabContainer;
