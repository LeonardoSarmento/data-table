import { isMatch, Link, useMatches } from '@tanstack/react-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';
import React from 'react';

export const Breadcrumbs = () => {
  const matches = useMatches();

  if (matches.some((match) => match.status === 'pending')) return null;

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <React.Fragment key={`breadcrumbItem-${match.id}`}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link from={match.fullPath}>
                  {match.loaderData?.crumb}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i + 1 < matchesWithCrumbs.length ? <BreadcrumbSeparator /> : null}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
