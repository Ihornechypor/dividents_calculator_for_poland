import iconSet from '../../assets/icommon/selection.json';
import * as Styled from './SvgIcon.styles';

interface IconProps {
  size?: string | number;
  icon: string;
}

const Icon = ({ size, icon }: IconProps) => {
  return <Styled.SvgIcon iconSet={iconSet} size={size} icon={icon} />;
};

export default Icon;
