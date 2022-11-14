import React, { FC } from 'react';

export type IGoogleBtnProps = {
  title: string;
};

export const GoogleBtnDefaultProps = {
  title: 'Component',
};

export const GoogleBtnNamespace = 'GoogleBtn';

const GoogleBtn: FC<IGoogleBtnProps> = ({ title }) => (
  <div className="template-comp">{title}</div>
);

GoogleBtn.displayName = GoogleBtnNamespace;
GoogleBtn.defaultProps = GoogleBtnDefaultProps;
export default React.memo(GoogleBtn);
