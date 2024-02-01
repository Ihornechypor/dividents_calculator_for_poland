import styled from 'styled-components';
import theme, { themeColors } from '../../styles/theme';

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
    width: 15px;
    height: 15px;
    margin-right: 10px;
    display: inline-block;
    border-radius: ${theme.global.borderRadius};
    ${(props) => props.type === 'warning' && `background-color: ${themeColors.warning}`}
  }
`;

const ResultTableWrapper = styled.div`
  margin-top: 10px;
  overflow-x: auto;
`;

const ResultTable = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;

  th,
  td {
    text-align: center;
    padding: 5px;
    vertical-align: middle;
    border: 1px solid ${themeColors.primary};
    font-size: 12px;
  }
`;
const ResultTableTr = styled.tr<ResultTableTrProps>`
  ${(props) => props.type === 'warning' && `background-color: ${themeColors.warning}`}
`;

export { ResultTableSection, ResultTableInfo, ResultTableWrapper, ResultTable, ResultTableTr };
