"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  DarkTheme,
  LightTheme,
  createChart,
  type ChartApi,
  type ChartOverlayApi,
  type OhlcData,
} from "@wicklib/core";

const MINUTE = 60_000;

interface DemoSample {
  bars: number[][];
}

function fallbackBars(): OhlcData[] {
  let price = 87_000;
  return Array.from({ length: 480 }, (_, index) => {
    const open = price;
    const change = Math.sin(index / 13) * 55 + Math.cos(index / 31) * 28;
    const close = Math.max(1, open + change);
    const high = Math.max(open, close) + 24 + Math.abs(Math.sin(index / 7)) * 18;
    const low = Math.min(open, close) - 24 - Math.abs(Math.cos(index / 9)) * 18;
    price = close;
    return { time: index * MINUTE, open, high, low, close, volume: 10 + (index % 60) };
  });
}

async function loadBars(): Promise<OhlcData[]> {
  try {
    const response = await fetch("/data/btc-1m-demo.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const sample = (await response.json()) as DemoSample;
    const bars = sample.bars.map(([time, open, high, low, close, volume]) => ({
      time: time!,
      open: open!,
      high: high!,
      low: low!,
      close: close!,
      volume: volume!,
    }));
    return bars.length > 0 ? bars : fallbackBars();
  } catch {
    return fallbackBars();
  }
}

export function DemoChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ChartApi | null>(null);
  const overlayRef = useRef<ChartOverlayApi | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const [dark, setDark] = useState(true);
  const darkRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async (): Promise<void> => {
      const bars = await loadBars();
      if (disposed) {
        return;
      }

      const currentDark = darkRef.current;
      const theme = currentDark ? DarkTheme : LightTheme;
      const chart = createChart(container, {
        autoSize: true,
        ...theme,
        crosshair: { ...theme.crosshair, mode: "magnet" },
        timeScale: { rightOffset: 4, maxVisibleBars: 900 },
      });
      chartRef.current = chart;

      const logo = new Image();
      const setLogo = (source: string): void => {
        logo.onload = () => overlayRef.current?.requestRender();
        logo.src = source;
      };
      logoRef.current = logo;
      setLogo(currentDark ? "/brand/wicklib-logo-light.svg" : "/brand/wicklib-logo-dark.svg");

      const overlay = chart.addOverlay({
        id: "wicklib-watermark",
        draw(context, frame) {
          const image = logoRef.current;
          if (!image || !image.complete || image.naturalWidth === 0) {
            return;
          }
          const width = 56;
          const height = width * (image.naturalHeight / image.naturalWidth);
          context.save();
          context.globalAlpha = 0.55;
          context.drawImage(
            image,
            frame.plot.left + 14,
            frame.plot.bottom - height - 14,
            width,
            height,
          );
          context.restore();
        },
      });
      overlayRef.current = overlay;

      const series = chart.addSeries(CandlestickSeries, { title: "BTC/USDT" });
      series.setData(bars);

      const last = bars[bars.length - 1]!;
      series.createPriceLine({
        price: last.close * 0.985,
        color: "#10b981",
        lineStyle: "dashed",
        title: "Entry",
        titlePosition: "plot",
      });
      series.createPriceLine({
        price: last.close * 1.025,
        color: "#f43f5e",
        lineStyle: "dotted",
        title: "Target",
        titlePosition: "plot",
      });
      series.setMarkers([
        {
          time: bars[40]!.time,
          position: "belowBar",
          shape: "arrowUp",
          color: "#10b981",
          text: "Buy",
        },
        {
          time: bars[180]!.time,
          position: "aboveBar",
          shape: "arrowDown",
          color: "#f43f5e",
          text: "Exit",
        },
      ]);
      chart.timeScale().fitContent();
      cleanup = () => chart.destroy();
    };

    void start();

    return () => {
      disposed = true;
      cleanup?.();
      chartRef.current = null;
      overlayRef.current = null;
      logoRef.current = null;
    };
  }, []);

  useEffect(() => {
    darkRef.current = dark;
    const theme = dark ? DarkTheme : LightTheme;
    chartRef.current?.setOptions({
      ...theme,
      crosshair: { ...theme.crosshair, mode: "magnet" },
    });
    const logo = logoRef.current;
    if (logo) {
      logo.onload = () => overlayRef.current?.requestRender();
      logo.src = dark ? "/brand/wicklib-logo-light.svg" : "/brand/wicklib-logo-dark.svg";
    }
  }, [dark]);

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <span className="text-xs text-neutral-500">BTC/USDT · 1m · Binance 2025 sample</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
          >
            {dark ? "Light" : "Dark"} theme
          </button>
          <button
            type="button"
            onClick={() => chartRef.current?.timeScale().fitContent()}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
          >
            Fit
          </button>
          <button
            type="button"
            onClick={() => {
              const chart = chartRef.current;
              if (!chart) return;
              const link = document.createElement("a");
              link.download = "wicklib-demo.png";
              link.href = chart.exportImage("image/png");
              link.click();
            }}
            className="rounded-md bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            PNG
          </button>
        </div>
      </div>
      <div ref={containerRef} className="h-[520px] w-full" />
    </div>
  );
}
