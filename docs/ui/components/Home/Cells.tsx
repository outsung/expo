import { css } from '@emotion/react';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  borderRadius,
  iconSize,
  palette,
  shadows,
  spacing,
  theme,
  typography,
} from '@expo/styleguide';
import { PropsWithChildren } from 'react';
import { Col, ColProps } from 'react-grid-system';

import { A, P } from '~/ui/components/Text';

export const GridCell = ({
  children,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
}: PropsWithChildren<ColProps>) => (
  <Col css={cellWrapperStyle} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
    <div css={cellStyle} className={className}>
      {children}
    </div>
  </Col>
);

type APIGridCellProps = ColProps & {
  icon?: string | JSX.Element;
  title?: string;
  link?: string;
};

export const APIGridCell = ({
  icon,
  title,
  link,
  className,
  sm = 6,
  md = 6,
  lg = 6,
  xl = 3,
}: APIGridCellProps) => (
  <Col css={cellWrapperStyle} md={md} sm={sm} lg={lg} xl={xl}>
    <A href={link} css={[cellStyle, cellAPIStyle, cellHoverStyle]} className={className}>
      <div css={cellIconWrapperStyle}>{icon}</div>
      <div css={cellTitleWrapperStyle}>
        {title}
        <ArrowRightIcon color={theme.icon.secondary} />
      </div>
    </A>
  </Col>
);

type CommunityGridCellProps = APIGridCellProps & {
  description?: string;
  iconBackground?: string;
};

export const CommunityGridCell = ({
  icon,
  iconBackground = palette.light.gray['800'],
  title,
  link,
  description,
  className,
  md = 6,
}: CommunityGridCellProps) => (
  <Col css={cellWrapperStyle} md={md}>
    <a
      href={link}
      css={[cellStyle, cellCommunityStyle, cellCommunityHoverStyle]}
      className={className}>
      <div css={[cellCommunityIconWrapperStyle, css({ backgroundColor: iconBackground })]}>
        {icon}
      </div>
      <div css={cellCommunityContentStyle}>
        <span css={cellCommunityTitleStyle}>{title}</span>
        <P css={cellCommunityDescriptionStyle}>{description}</P>
      </div>
      <ArrowUpRightIcon color={theme.icon.secondary} css={cellCommunityLinkIconStyle} />
    </a>
  </Col>
);

const cellWrapperStyle = css`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const cellHoverStyle = css`
  & {
    transition: box-shadow 200ms;

    svg {
      transition: transform 200ms;
    }
  }

  &:hover {
    box-shadow: ${shadows.tiny};

    svg {
      transform: scale(1.05);
    }

    svg[role='img'] {
      transform: none;
    }
  }
`;

const cellStyle = css({
  margin: spacing[4],
  padding: spacing[8],
  minHeight: 200,
  overflow: 'hidden',
  position: 'relative',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.border.default,
  borderRadius: borderRadius.large,
});

const cellAPIStyle = css({
  display: 'block',
  backgroundColor: theme.background.secondary,
  padding: 0,
  overflow: 'hidden',
  textDecoration: 'none',
});

const cellIconWrapperStyle = css({
  display: 'flex',
  minHeight: 136,
  justifyContent: 'space-around',
  alignItems: 'center',
});

const cellTitleWrapperStyle = css({
  ...typography.fontSizes[15],
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.background.default,
  padding: spacing[4],
  textDecoration: 'none',
  fontFamily: typography.fontStacks.medium,
  lineHeight: '30px',
  color: theme.text.default,
  alignItems: 'center',
});

const cellCommunityStyle = css({
  display: 'flex',
  minHeight: `calc(100% - (2 * ${spacing[3]}px}))`,
  padding: spacing[4],
  margin: `${spacing[3]}px ${spacing[4]}px`,
  flexDirection: 'row',
  textDecoration: 'none',
});

const cellCommunityIconWrapperStyle = css({
  height: 48,
  width: 48,
  minWidth: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: borderRadius.large,
  marginRight: spacing[3],
});

const cellCommunityContentStyle = css({
  flexGrow: 1,
});

const cellCommunityTitleStyle = css({
  ...typography.fontSizes[16],
  fontFamily: typography.fontStacks.medium,
  color: theme.text.default,
  textDecoration: 'none',
  marginBottom: spacing[2],
});

const cellCommunityDescriptionStyle = css({
  ...typography.fontSizes[14],
  color: theme.text.secondary,
});

const cellCommunityLinkIconStyle = css({
  marginLeft: spacing[1.5],
  alignSelf: 'center',
  minWidth: iconSize.regular,
});

const cellCommunityHoverStyle = css`
  & {
    transition: box-shadow 200ms;

    svg {
      transition: transform 200ms;
    }
  }

  &:hover {
    box-shadow: ${shadows.tiny};

    svg {
      transform: scale(1.075);
    }
  }
`;
