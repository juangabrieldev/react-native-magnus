import * as React from 'react';
import RNModal from 'react-native-modal';
import { SafeAreaView, FlatList } from 'react-native';
import {
  useContext,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';

import { getStyle } from './select.style';
import { Div } from '../div/div.component';
import { ThemeContext } from '../../theme';
import { Text } from '../text/text.component';
import { Input } from '../input/input.component';
import { Icon } from '../icon/icon.component';
import { Option } from './select.option.component';
import { Button } from '../button/button.component';
import { SelectProps, SelectRef, CompoundedSelect } from './select.type';
import { InputProps } from '../input/input.type';
import { ButtonProps } from '../button/button.type';

const Select = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    value,
    title,
    message,
    footer,
    data,
    multiple,
    renderItem,
    keyExtractor,
    renderNoResultsView,
    renderSubmitButton,
    renderSearchInput,
    searchableProps,
    onSelect: onSelectProp,
  } = props;
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(props.isVisible || false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const isSearchable = useMemo(() => !!searchableProps?.length, [
    searchableProps,
  ]);

  const computedStyle = getStyle(theme, props);

  const resolveMultiLevelAccess = (obj: any, key: string) => {
    return key.split('.').reduce((cur: any, keySection: string) => {
      if (cur === null || cur === undefined) {
        return;
      }

      if (cur[keySection] === null || cur[keySection] === undefined) {
        console.warn(`Property "${key}" does not exists! `);
        return;
      }

      return cur[keySection];
    }, obj);
  };

  const filteredData = useMemo(() => {
    if (
      !searchableProps ||
      (Array.isArray(searchableProps) && !searchableProps.length)
    ) {
      return data;
    }

    return data.filter((item) => {
      const lowSearch = searchTerm.toLowerCase();

      if (!Array.isArray(searchableProps)) {
        return String(item).toLowerCase().includes(lowSearch);
      }

      return searchableProps.some((key: string) =>
        String(resolveMultiLevelAccess(item, key))
          .toLowerCase()
          .includes(lowSearch)
      );
    });
  }, [searchableProps, searchTerm, data]);

  useEffect(() => {
    if (visible) {
      clearSearchInput();
    }

    if ('isVisible' in props) {
      setVisible(props.isVisible || visible);
    }
  }, [props, visible]);

  /**
   * exposing functions to parent
   */
  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false);
    },
    open() {
      setVisible(true);
    },
  }));

  /**
   * set values of select based if its multiple select
   * or single valued select
   *
   * @param value
   */
  const onSelect = (value: any) => {
    let finalValue;

    if (multiple) {
      const copy = selectedValue.slice();
      const index = selectedValue.indexOf(value);
      if (index !== -1) {
        copy.splice(index, 1);
      } else {
        copy.push(value);
      }

      setSelectedValue(copy);
      finalValue = copy;
    } else {
      setSelectedValue(value);
      setVisible(false);
      finalValue = value;
    }

    onSelectProp(finalValue);
  };

  /**
   * render title at top select modal
   */
  const renderTitle = () => {
    if (title) {
      return typeof title === 'string' ? (
        <Text px="xl" fontSize="lg" fontWeight="bold" textTransform="uppercase">
          {title}
        </Text>
      ) : (
        title
      );
    }

    return false;
  };

  /**
   * render message at top select modal
   */
  const renderMessage = () => {
    if (message) {
      return typeof message === 'string' ? (
        <Text px="xl" fontSize="lg">
          {message}
        </Text>
      ) : (
        message
      );
    }

    return false;
  };

  const clearSearchInput = () => setSearchTerm('');

  /**
   * render searchbar at top select modal
   */
  const renderSearchbar = () => {
    if (!isSearchable) {
      return;
    }

    const searchInputElement =
      renderSearchInput && renderSearchInput({ clearText: clearSearchInput });

    const mandatoryProps: Partial<InputProps> = {
      value: searchTerm,
      onChangeText: (text: string) => setSearchTerm(text),
      autoCompleteType: 'off',
    };

    if (searchInputElement) {
      return React.cloneElement(searchInputElement, mandatoryProps);
    }

    return (
      <Input
        prefix={<Icon mr="lg" name="search1" color="gray700" fontSize="3xl" />}
        suffix={
          searchTerm ? (
            <Button
              p="sm"
              alignSelf="center"
              rounded="circle"
              bg="gray700"
              onPress={clearSearchInput}
            >
              <Icon name="close" color="white" fontSize="xs" />
            </Button>
          ) : null
        }
        mx="xl"
        mt="-md"
        mb="lg"
        fontSize="md"
        borderWidth={0}
        placeholder="Search items"
        bg="gray200"
        {...mandatoryProps}
      />
    );
  };

  const renderFooter = () => {
    if (footer) {
      return footer;
    }

    // if the component is single-valued and no footer is provided
    // don't render anything in footer
    if (!multiple) {
      return;
    }

    const submitButtonElement = renderSubmitButton && renderSubmitButton();

    const mandatoryProps: Partial<ButtonProps> = {
      onPress: () => setVisible(false),
    };

    if (submitButtonElement) {
      return React.cloneElement(submitButtonElement, mandatoryProps);
    }

    return (
      <Button block bg="green600" mx="xl" mt="lg" mb="xl" {...mandatoryProps}>
        Submit
      </Button>
    );
  };

  const renderNoResultsFound = () => {
    renderNoResultsView && renderNoResultsView(searchTerm);
  };

  return (
    <RNModal
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      isVisible={visible}
      backdropColor="black"
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      hideModalContentWhileAnimating
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <Div style={computedStyle.wrapper}>
        <SafeAreaView style={computedStyle.container}>
          <Div>
            <Div py="xl">
              {renderTitle()}
              {renderMessage()}
            </Div>
            <Div>{renderSearchbar()}</Div>
          </Div>

          {filteredData.length > 0 ? (
            <Div flex={1}>
              <FlatList
                data={filteredData}
                keyExtractor={keyExtractor}
                renderItem={({ item, index }) =>
                  React.cloneElement(renderItem(item, index), {
                    onSelect,
                    selectedValue,
                  })
                }
              />
            </Div>
          ) : (
            renderNoResultsFound()
          )}

          {renderFooter()}
        </SafeAreaView>
      </Div>
    </RNModal>
  );
}) as CompoundedSelect;

Select.defaultProps = {
  bg: 'white',
  rounded: 'none',
  flexDir: 'column',
  isVisible: false,
  // mb: 'xl',
  // @ts-ignore
  renderNoResultsView: (searchTerm) => (
    <Div flex={1} px="2xl" py="xl">
      <Text fontSize="lg">No results found for "{searchTerm}"</Text>
    </Div>
  ),
  keyExtractor: (item, index) => `${index}`,
};

Select.Option = Option;

export { Select };
