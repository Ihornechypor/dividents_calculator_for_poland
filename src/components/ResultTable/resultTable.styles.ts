import styled from 'styled-components';
import { themeColors } from '../../styles/theme';

type ResultTableInfoProps = {
  type: 'warning' | null;
};

type ResultTableTrProps = {
  type?: 'warning' | null;
};

const ResultTableSection = styled.section``;
const ResultTableInfo = styled.p<ResultTableInfoProps>`
  display: flex;
  align-items: center;
  &:before {
    content: '';
    width: 10px;
    height: 10px;
    margin-right: 10px;
    display: inline-block;
    ${(props) => props.type === 'warning' && `background-color: ${themeColors.warning}`}
  }
`;

const ResultTable = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  th,
  td {
    text-align: center;
    padding: 0.75rem;
    vertical-align: middle;
    border: 1px solid ${themeColors.primary};
    font-size: 12px;
  }
`;
const ResultTableTr = styled.tr<ResultTableTrProps>`
  ${(props) => props.type === 'warning' && `background-color: ${themeColors.warning}`}
`;

export { ResultTableSection, ResultTableInfo, ResultTable, ResultTableTr };
