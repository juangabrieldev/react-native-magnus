import {
  Orientation,
  OnSwipeCompleteParams,
  Direction,
  OnOrientationChange,
  PresentationStyle,
} from 'react-native-modal';
import { StyleProp, ViewStyle } from 'react-native';
import { Animation, CustomAnimation } from 'react-native-animatable';

import {
  BorderPropsType,
  SpacingPropsType,
  RoundedPropsType,
} from '../../theme';

export type ModalRef = {
  open: () => void;
  close: () => void;
};

type OrNull<T> = null | T;
export interface ModalProps
  extends BorderPropsType,
    SpacingPropsType,
    RoundedPropsType {
  bg?: string;
  h?: number | string;
  children: React.ReactElement[] | React.ReactElement;
  animationIn?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOut?: Animation | CustomAnimation;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: React.ReactNode;
  useNativeDriver?: boolean;
  deviceHeight?: number;
  deviceWidth?: number;
  isVisible?: boolean;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  swipeThreshold?: number;
  scrollTo?: OrNull<(e: any) => void>;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
  supportedOrientations?: Orientation[];
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  onSwipeStart?: () => void;
  onSwipeMove?: (percentageShown: number) => void;
  onSwipeComplete?: (params: OnSwipeCompleteParams) => void;
  onSwipeCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  swipeDirection?: Direction | Array<Direction>;
  onDismiss?: () => void;
  onShow?: () => void;
  hardwareAccelerated?: boolean;
  onOrientationChange?: OnOrientationChange;
  presentationStyle?: PresentationStyle;
}
