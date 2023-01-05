import styled from 'styled-components';

export const Wrapper = styled.div`
  .ant-pro-table {
    & > .ant-pro-table-search {
      margin-bottom: 0;
      padding-bottom: 0;
      /* .ant-row.ant-form-item {
        margin-bottom: 12px;
      } */
    }
    /* .ant-pro-table-list-toolbar{
    margin-top: -18px;
  } */
  }
  .has-pro-table-margin.ant-pro-table {
    .ant-pro-table-list-toolbar {
      margin-top: 0;
    }
  }
  .ant-pro-table-list-toolbar-container {
    padding: 12px 0;
  }
  /* .ant-pro-table {
  & > .ant-pro-table-search {
    margin-bottom: -24px;
  }
} */
  .react-resizable {
    position: relative;
    background-clip: padding-box;
  }

  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 1;
  }
  .clear-padding-horizontal {
    &.ant-pro-table > .ant-card > .ant-card-body {
      padding-left: 0;
      padding-right: 0;
    }
    &.ant-pro-table > .ant-pro-table-search {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      margin-bottom: -12px;
      .ant-form-item {
        margin-bottom: 12px;
      }
    }
  }
`;
