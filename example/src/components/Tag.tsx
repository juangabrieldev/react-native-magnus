import React from "react";
import { ScrollView } from "react-native";
import { Div, Icon, Tag } from "react-native-magnus";
import ExampleHeader from "../utils/ExampleHeader";
import ExamplePage from "../utils/ExamplePage";
import ExampleSection from "../utils/ExampleSection";

const TagComponent: React.FC = () => {
  return (
    <ExamplePage>
      <ExampleHeader name="tag" />

      <ScrollView>
        <ExampleSection name="default">
          <Tag>Tag</Tag>
        </ExampleSection>

        <ExampleSection name="with suffix/prefix">
          <Div flexDir="row">
            <Tag
              ml="sm"
              suffix={<Icon name="close" color="gray700" fontSize="md" />}
            >
              Close
            </Tag>
            <Tag
              ml="sm"
              prefix={<Icon name="edit" color="gray700" fontSize="md" />}
            >
              Edit
            </Tag>
          </Div>
        </ExampleSection>

        <ExampleSection name="customizations">
          <Div flexDir="row">
            <Tag ml="sm" bg="yellow300" borderColor="yellow700" borderWidth={1}>
              Custom Tag 1
            </Tag>
            <Tag ml="sm" bg="blue500" borderColor="blue700" borderWidth={1}>
              Custom Tag 1
            </Tag>
            <Tag ml="sm" bg="blue700" color="white">
              Solid Tag
            </Tag>
          </Div>
        </ExampleSection>
      </ScrollView>
    </ExamplePage>
  );
};

export default TagComponent;
