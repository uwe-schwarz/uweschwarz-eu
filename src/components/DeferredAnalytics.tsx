"use client";

import { Analytics } from "@vercel/analytics/next";

const DeferredAnalytics = () => <Analytics />;

DeferredAnalytics.displayName = "DeferredAnalytics";

export default DeferredAnalytics;
