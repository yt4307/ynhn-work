"use client";

import styled from "@emotion/styled";

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.h1}px;
  line-height: ${({ theme }) => theme.font.lineHeight.heading};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.heading};
  margin: 0;
  position: relative;
  display: inline-block;
  cursor: default;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: ${({ theme }) => theme.space(1)};
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.color.brand[700]};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.h2}px;
  line-height: ${({ theme }) => theme.font.lineHeight.heading};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.heading};
  margin: 0 0 ${({ theme }) => theme.space(2)};
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.subtitle}px;
  line-height: ${({ theme }) => theme.font.lineHeight.subtitle};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.subtitle};
  color: ${({ theme }) => theme.color.neutral[700]};
  margin: 0;
`;

export const Body = styled.p`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.body}px;
  line-height: ${({ theme }) => theme.font.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.body};
  color: ${({ theme }) => theme.color.neutral[800]};
  margin: 0;
`;

export const Muted = styled(Body)`
  color: ${({ theme }) => theme.color.neutral[600]};
`;

export const HighlightWord = styled.span`
  font-weight: 600;
  transition: letter-spacing 0.15s ease, color 0.15s ease;
  letter-spacing: 0;

  &:hover {
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.brand[700]};
  }
`;
