import * as React from 'react';
import RNModal from 'react-native-modal';
import { SafeAreaView } from 'react-native';
import { useContext, useState, useEffect, useImperativeHandle } from 'react';

import { getStyle } from './modal.style';
import { ThemeContext } from '../../theme';
import { Div } from '../div/div.component';
import { ModalProps, ModalRef } from './modal.type';

const Modal = React.forwardRef<ModalRef, ModalProps>((props, ref) => {
  const {
    bg,
    h,
    m,
    mt,
    mr,
    mb,
    ml,
    ms,
    p,
    pr,
    pt,
    pb,
    pl,
    rounded,
    roundedTop,
    roundedRight,
    roundedBottom,
    roundedLeft,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderTopColor,
    borderRightColor,
    borderWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
    borderEndWidth,
    borderTopWidth,
    justifyContent,
    children,
    isVisible,
    ...rest
  } = props;
  const [visible, setVisible] = useState(isVisible);
  const { theme } = useContext(ThemeContext);
  const computedStyle = getStyle(theme, props);

  useEffect(() => {
    if ('isVisible' in props) {
      setVisible(props.isVisible);
    }
  }, [props, visible]);

  /**
   * exposing functions through ref
   */
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  return (
    <RNModal isVisible={visible} {...rest} style={computedStyle.modal}>
      <Div bg={bg} h={h || '100%'} style={computedStyle.container}>
        <SafeAreaView style={computedStyle.safeView}>{children}</SafeAreaView>
      </Div>
    </RNModal>
  );
});

Modal.defaultProps = {
  bg: 'white',
  h: '100%',
  isVisible: false,
  justifyContent: 'flex-end',
};

export { Modal };
