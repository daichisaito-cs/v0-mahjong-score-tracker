module.exports = [
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/hooks/use-auth-user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthUser",
    ()=>useAuthUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$20_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@tanstack+react-query@5.90.20_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useAuthUser() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$20_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "authUser"
        ],
        queryFn: async ()=>{
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return data.session?.user ?? null;
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
}
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$label$40$2$2e$1$2e$1_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@radix-ui+react-label@2.1.1_@types+react-dom@19.0.0_@types+react@19.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$label$40$2$2e$1$2e$1_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$checkbox$40$1$2e$1$2e$3_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@radix-ui+react-checkbox@1.1.3_@types+react-dom@19.0.0_@types+react@19.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$checkbox$40$1$2e$1$2e$3_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$checkbox$40$1$2e$1$2e$3_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/alert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground',
            destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeagueCreateForm",
    ()=>LeagueCreateForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/alert.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/avatar.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function LeagueCreateForm({ userId }) {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitted, setIsSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rules, setRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedRuleId, setSelectedRuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingRules, setLoadingRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedFriends, setSelectedFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingFriends, setLoadingFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchRules = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data } = await supabase.from("rules").select("*").order("created_at", {
                ascending: false
            });
            setRules(data || []);
            if (data && data.length > 0) {
                setSelectedRuleId(data[0].id);
            }
            setLoadingRules(false);
        };
        fetchRules();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchFriends = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: friendships } = await supabase.from("friendships").select("requester_id, addressee_id").eq("status", "accepted").or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);
            if (!friendships || friendships.length === 0) {
                setLoadingFriends(false);
                return;
            }
            const friendIds = friendships.map((f)=>f.requester_id === userId ? f.addressee_id : f.requester_id);
            const { data: profiles } = await supabase.from("profiles").select("id, display_name, friend_code, avatar_url").in("id", friendIds);
            setFriends(profiles || []);
            setLoadingFriends(false);
        };
        fetchFriends();
    }, [
        userId
    ]);
    const toggleFriend = (friendId)=>{
        setSelectedFriends((prev)=>prev.includes(friendId) ? prev.filter((id)=>id !== friendId) : [
                ...prev,
                friendId
            ]);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isSubmitted || isLoading) return;
        setIsLoading(true);
        setError(null);
        if (!name.trim()) {
            setError("リーグ名を入力してください");
            setIsLoading(false);
            return;
        }
        if (!selectedRuleId) {
            setError("ルールを選択してください");
            setIsLoading(false);
            return;
        }
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        try {
            const selectedRule = rules.find((r)=>r.id === selectedRuleId);
            if (!selectedRule) {
                throw new Error("ルールが見つかりません");
            }
            console.log("[v0] Creating league with:", {
                name: name.trim(),
                description: description.trim(),
                rule_id: selectedRuleId,
                game_type: selectedRule.game_type,
                owner_id: userId
            });
            const { data: league, error: leagueError } = await supabase.from("leagues").insert({
                name: name.trim(),
                description: description.trim() || null,
                rule_id: selectedRuleId,
                game_type: selectedRule.game_type,
                owner_id: userId
            }).select().single();
            if (leagueError) {
                console.error("[v0] League creation error:", leagueError);
                throw leagueError;
            }
            console.log("[v0] League created:", league);
            const members = [
                {
                    league_id: league.id,
                    user_id: userId
                },
                ...selectedFriends.map((friendId)=>({
                        league_id: league.id,
                        user_id: friendId
                    }))
            ];
            console.log("[v0] Inserting members:", members);
            const { error: memberError } = await supabase.from("league_members").insert(members);
            if (memberError) {
                console.error("[v0] Member insertion error:", memberError);
                throw memberError;
            }
            if (selectedFriends.length > 0) {
                const allMemberIds = [
                    userId,
                    ...selectedFriends
                ];
                const friendPairs = [];
                // すべてのメンバーペアを作成
                for(let i = 0; i < allMemberIds.length; i++){
                    for(let j = i + 1; j < allMemberIds.length; j++){
                        const [smaller, larger] = allMemberIds[i] < allMemberIds[j] ? [
                            allMemberIds[i],
                            allMemberIds[j]
                        ] : [
                            allMemberIds[j],
                            allMemberIds[i]
                        ];
                        friendPairs.push({
                            requester_id: smaller,
                            addressee_id: larger,
                            status: "accepted"
                        });
                    }
                }
                if (friendPairs.length > 0) {
                    await supabase.from("friendships").upsert(friendPairs, {
                        onConflict: "requester_id,addressee_id",
                        ignoreDuplicates: true
                    });
                }
            }
            setIsSubmitted(true);
            window.location.href = `/leagues/${league.id}`;
        } catch (err) {
            console.error("[v0] League creation full error:", err);
            setError(err instanceof Error ? err.message : "作成に失敗しました");
            setIsLoading(false);
        }
    };
    if (loadingRules) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted-foreground",
            children: "読み込み中..."
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
            lineNumber: 210,
            columnNumber: 12
        }, this);
    }
    if (rules.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Alert"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "リーグを作成するには、先にルールを作成する必要があります。"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/rules/new",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                children: "ルールを作成"
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
            lineNumber: 215,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "基本情報"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "name",
                                        children: "リーグ名 *"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "name",
                                        placeholder: "例: 週末麻雀リーグ",
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        required: true,
                                        disabled: isLoading || isSubmitted
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "description",
                                        children: "説明"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                        id: "description",
                                        placeholder: "リーグの説明やルールなど",
                                        value: description,
                                        onChange: (e)=>setDescription(e.target.value),
                                        rows: 3,
                                        disabled: isLoading || isSubmitted
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "ルール選択"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 262,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "rule",
                                        children: "使用するルール *"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "rule",
                                        className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                        value: selectedRuleId,
                                        onChange: (e)=>setSelectedRuleId(e.target.value),
                                        disabled: isLoading || isSubmitted,
                                        children: rules.map((rule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: rule.id,
                                                children: [
                                                    rule.name,
                                                    " (",
                                                    rule.game_type === "four_player" ? "四麻" : "三麻",
                                                    ")"
                                                ]
                                            }, rule.id, true, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                lineNumber: 275,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            selectedRuleId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-border bg-muted/50 p-4 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        children: "ルール詳細"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-muted-foreground space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "ウマ: ",
                                                    rules.find((r)=>r.id === selectedRuleId)?.uma_first,
                                                    " /",
                                                    " ",
                                                    rules.find((r)=>r.id === selectedRuleId)?.uma_second,
                                                    " /",
                                                    " ",
                                                    rules.find((r)=>r.id === selectedRuleId)?.uma_third,
                                                    rules.find((r)=>r.id === selectedRuleId)?.game_type === "four_player" && ` / ${rules.find((r)=>r.id === selectedRuleId)?.uma_fourth ?? "-"}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "持ち点: ",
                                                    rules.find((r)=>r.id === selectedRuleId)?.starting_points.toLocaleString(),
                                                    " 返し:",
                                                    " ",
                                                    rules.find((r)=>r.id === selectedRuleId)?.return_points.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                "参加メンバー"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: loadingFriends ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm",
                            children: "読み込み中..."
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 313,
                            columnNumber: 13
                        }, this) : friends.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "フレンドを選択してリーグに参加させることができます（あなたは自動で参加します）"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: friends.map((friend)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                    checked: selectedFriends.includes(friend.id),
                                                    onCheckedChange: ()=>toggleFriend(friend.id),
                                                    disabled: isLoading || isSubmitted
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-10 w-10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: friend.avatar_url || undefined
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                                    lineNumber: 332,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: friend.display_name.charAt(0).toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: friend.display_name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    children: [
                                                                        "ID: ",
                                                                        friend.friend_code
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, friend.id, true, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                            lineNumber: 321,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                selectedFriends.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: [
                                        selectedFriends.length,
                                        "人のフレンドを選択中"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                                    lineNumber: 344,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 315,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm",
                            children: "フレンドがいません。マイページからフレンドを追加してください。"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                lineNumber: 304,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-destructive",
                children: error
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                lineNumber: 355,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "outline",
                        className: "flex-1 bg-transparent",
                        onClick: ()=>window.history.back(),
                        disabled: isLoading || isSubmitted,
                        children: "キャンセル"
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        className: "flex-1",
                        disabled: isLoading || isSubmitted,
                        children: isLoading || isSubmitted ? "作成中..." : "作成する"
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@radix-ui+react-dialog@1.1.4_@types+react-dom@19.0.0_@types+react@19.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$0$2e$0_$40$types$2b$react$40$19$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeagueMemberAdd",
    ()=>LeagueMemberAdd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/avatar.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function LeagueMemberAdd({ leagueId, userId, existingMemberIds, onMembersAdded }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedFriends, setSelectedFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingFriends, setLoadingFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const fetchFriends = async ()=>{
            setLoadingFriends(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            // 承認済みフレンドを取得
            const { data: friendships } = await supabase.from("friendships").select("requester_id, addressee_id").eq("status", "accepted").or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);
            if (!friendships || friendships.length === 0) {
                setLoadingFriends(false);
                return;
            }
            // フレンドのIDを抽出（既にメンバーのフレンドは除外）
            const friendIds = friendships.map((f)=>f.requester_id === userId ? f.addressee_id : f.requester_id).filter((id)=>!existingMemberIds.includes(id));
            if (friendIds.length === 0) {
                setFriends([]);
                setLoadingFriends(false);
                return;
            }
            // フレンドのプロフィールを取得
            const { data: profiles } = await supabase.from("profiles").select("id, display_name, friend_code, avatar_url").in("id", friendIds);
            setFriends(profiles || []);
            setLoadingFriends(false);
        };
        fetchFriends();
    }, [
        open,
        userId,
        existingMemberIds
    ]);
    const toggleFriend = (friendId)=>{
        setSelectedFriends((prev)=>prev.includes(friendId) ? prev.filter((id)=>id !== friendId) : [
                ...prev,
                friendId
            ]);
    };
    const handleAdd = async ()=>{
        if (selectedFriends.length === 0) return;
        setIsLoading(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        try {
            console.log("[v0] Adding members:", selectedFriends);
            // メンバーを追加
            const members = selectedFriends.map((friendId)=>({
                    league_id: leagueId,
                    user_id: friendId
                }));
            const { error } = await supabase.from("league_members").insert(members);
            if (error) throw error;
            const allMemberIds = [
                ...existingMemberIds,
                ...selectedFriends
            ];
            const friendPairs = [];
            // すべてのメンバーの組み合わせを生成
            for(let i = 0; i < allMemberIds.length; i++){
                for(let j = i + 1; j < allMemberIds.length; j++){
                    const id1 = allMemberIds[i];
                    const id2 = allMemberIds[j];
                    // 小さいIDを常にrequester_idにして重複を防ぐ
                    friendPairs.push({
                        requester_id: id1 < id2 ? id1 : id2,
                        addressee_id: id1 < id2 ? id2 : id1,
                        status: "accepted"
                    });
                }
            }
            console.log("[v0] Creating friend relationships:", friendPairs.length, "pairs");
            console.log("[v0] All member IDs:", allMemberIds);
            console.log("[v0] Current user ID:", userId);
            let successCount = 0;
            let failCount = 0;
            for (const pair of friendPairs){
                const { error: friendError } = await supabase.from("friendships").upsert([
                    pair
                ], {
                    onConflict: "requester_id,addressee_id",
                    ignoreDuplicates: false
                });
                if (friendError) {
                    console.error(`[v0] Failed pair: ${pair.requester_id} <-> ${pair.addressee_id}`, friendError.message);
                    failCount++;
                } else {
                    console.log(`[v0] Success pair: ${pair.requester_id} <-> ${pair.addressee_id}`);
                    successCount++;
                }
            }
            console.log(`[v0] Friend creation complete: ${successCount} success, ${failCount} failed`);
            setSelectedFriends([]);
            setOpen(false);
            onMembersAdded?.();
            window.location.reload();
        } catch (err) {
            console.error("メンバー追加エラー:", err);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: setOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 bg-transparent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        "メンバー追加"
                    ]
                }, void 0, true, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "フレンドをリーグに追加"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: loadingFriends ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm",
                            children: "読み込み中..."
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this) : friends.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2 max-h-64 overflow-y-auto",
                                    children: friends.map((friend)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                    checked: selectedFriends.includes(friend.id),
                                                    onCheckedChange: ()=>toggleFriend(friend.id),
                                                    disabled: isLoading
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-10 w-10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: friend.avatar_url || undefined
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: friend.display_name.charAt(0).toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: friend.display_name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                                    lineNumber: 183,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    children: [
                                                                        "ID: ",
                                                                        friend.friend_code
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                                    lineNumber: 184,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, friend.id, true, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setOpen(false),
                                            disabled: isLoading,
                                            children: "キャンセル"
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleAdd,
                                            disabled: isLoading || selectedFriends.length === 0,
                                            children: isLoading ? "追加中..." : `${selectedFriends.length}人を追加`
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm py-4 text-center",
                            children: [
                                "追加できるフレンドがいません。",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this),
                                "全員すでにリーグに参加しているか、フレンドがいません。"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeagueDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$20_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@tanstack+react-query@5.90.20_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$hooks$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/hooks/use-auth-user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$league$2d$create$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-create-form.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$league$2d$member$2d$add$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/components/league-member-add.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function isValidUUID(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}
const EPSILON = 1e-6;
function addRankLabels(items, getValue, epsilon = EPSILON) {
    let lastValue = null;
    let lastRank = 0;
    let position = 0;
    return items.map((item)=>{
        position += 1;
        const value = getValue(item);
        const isTie = lastValue !== null && Math.abs(value - lastValue) < epsilon;
        if (!isTie) {
            lastRank = position;
            lastValue = value;
        }
        return {
            ...item,
            rankLabel: lastRank
        };
    });
}
function LeagueDetailPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const [selectedPlayerId, setSelectedPlayerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const leagueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const raw = params?.id;
        return Array.isArray(raw) ? raw[0] : raw;
    }, [
        params
    ]);
    const userQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$hooks$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const user = userQuery.data;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (userQuery.isFetched && !user) router.replace("/auth/login");
    }, [
        router,
        user,
        userQuery.isFetched
    ]);
    if (userQuery.isLoading || userQuery.isFetched && !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20 md:pb-0 max-w-xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "py-12 text-center text-muted-foreground",
                    children: "読み込み中..."
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    if (leagueId === "new") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20 md:pb-0 max-w-xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-foreground",
                            children: "リーグを作成"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "新しいリーグの設定を入力してください"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$league$2d$create$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LeagueCreateForm"], {
                    userId: user.id
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this);
    }
    if (!leagueId || !isValidUUID(leagueId)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20 md:pb-0 max-w-xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "py-12 text-center text-muted-foreground",
                    children: "リーグが見つかりません"
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this);
    }
    const leagueQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$20_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "league-detail",
            leagueId,
            user?.id
        ],
        enabled: Boolean(user?.id && leagueId && isValidUUID(leagueId)),
        queryFn: async ()=>{
            const { data: league, error: leagueError } = await supabase.from("leagues").select("*").eq("id", leagueId).single();
            if (leagueError) throw leagueError;
            if (!league) return null;
            const { data: members, error: membersError } = await supabase.from("league_members").select("user_id, profiles(id, display_name, friend_code, avatar_url)").eq("league_id", leagueId);
            if (membersError) throw membersError;
            const memberIds = (members || []).map((m)=>m.user_id).filter(Boolean);
            let ownerProfile = null;
            if (!memberIds.includes(league.owner_id)) {
                const { data: profileRow } = await supabase.from("profiles").select("id, display_name, avatar_url").eq("id", league.owner_id).maybeSingle();
                ownerProfile = profileRow || null;
            }
            const { data: games, error: gamesError } = await supabase.from("games").select(`
          *,
          game_results (
            *,
            profiles (display_name, avatar_url)
          )
        `).eq("league_id", leagueId).order("played_at", {
                ascending: false
            });
            if (gamesError) throw gamesError;
            const { data: leagueRollups, error: leagueRollupsError } = await supabase.from("league_user_game_rollups").select("*").eq("league_id", leagueId);
            if (leagueRollupsError) {
                // eslint-disable-next-line no-console
                console.warn("[v0] failed to load league_user_game_rollups:", leagueRollupsError);
            }
            const rollupUserIds = (leagueRollups || []).map((r)=>r.user_id).filter(Boolean);
            const seedIds = Array.from(new Set([
                ...memberIds,
                league.owner_id,
                ...rollupUserIds
            ]));
            let extraProfiles = [];
            if (seedIds.length > 0) {
                const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, display_name, avatar_url").in("id", seedIds);
                if (profilesError) {
                    // eslint-disable-next-line no-console
                    console.warn("[v0] failed to load profiles:", profilesError);
                } else {
                    extraProfiles = profilesData || [];
                }
            }
            return {
                league,
                members: members || [],
                ownerProfile,
                games: games || [],
                leagueRollups: leagueRollups || [],
                extraProfiles
            };
        }
    });
    if (leagueQuery.isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20 md:pb-0 max-w-xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "py-12 text-center text-muted-foreground",
                    children: "読み込み中..."
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, this);
    }
    const data = leagueQuery.data;
    if (!data || !data.league) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-20 md:pb-0 max-w-xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "py-12 text-center text-muted-foreground",
                    children: "リーグが見つかりません"
                }, void 0, false, {
                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this);
    }
    const { league, members, ownerProfile, games, leagueRollups, extraProfiles } = data;
    const profileMap = new Map();
    extraProfiles?.forEach((p)=>{
        if (!p?.id) return;
        profileMap.set(p.id, {
            name: p.display_name || "ユーザー",
            avatarUrl: p.avatar_url || null
        });
    });
    const playerStats = {};
    games?.forEach((game)=>{
        game.game_results?.forEach((result)=>{
            if (!result.user_id) return;
            const odIndex = result.user_id;
            const fallbackProfile = profileMap.get(odIndex);
            const name = result.profiles?.display_name || result.player_name || fallbackProfile?.name || "Unknown";
            const avatarUrl = result.profiles?.avatar_url || fallbackProfile?.avatarUrl;
            if (!playerStats[odIndex]) {
                playerStats[odIndex] = {
                    odIndex,
                    name,
                    avatarUrl,
                    totalPoints: 0,
                    gameCount: 0,
                    rankSum: 0,
                    rankCounts: [
                        0,
                        0,
                        0,
                        0
                    ],
                    bestScore: null
                };
            }
            playerStats[odIndex].totalPoints += Number(result.point);
            playerStats[odIndex].gameCount += 1;
            playerStats[odIndex].rankSum += Number(result.rank);
            if (result.rank >= 1 && result.rank <= 4) {
                playerStats[odIndex].rankCounts[result.rank - 1] += 1;
            }
            const rawScoreNum = Number((result.raw_score ?? "").toString().replace(/,/g, ""));
            if (Number.isFinite(rawScoreNum)) {
                const currentBest = playerStats[odIndex].bestScore;
                playerStats[odIndex].bestScore = currentBest === null || currentBest === undefined ? rawScoreNum : Math.max(currentBest, rawScoreNum);
            }
        });
    });
    (leagueRollups || []).forEach((row)=>{
        const userId = row.user_id;
        if (!userId) return;
        if (!playerStats[userId]) {
            const fallback = profileMap.get(userId);
            playerStats[userId] = {
                odIndex: userId,
                name: fallback?.name || "Unknown",
                avatarUrl: fallback?.avatarUrl || null,
                totalPoints: 0,
                gameCount: 0,
                rankSum: 0,
                rankCounts: [
                    0,
                    0,
                    0,
                    0
                ],
                bestScore: null
            };
        }
        const rolledGameCount = Number(row.rolled_game_count ?? 0);
        const rolledTotalPoints = Number(row.rolled_total_points ?? 0);
        const rolledRankCounts = [
            Number(row.rolled_rank1_count ?? 0),
            Number(row.rolled_rank2_count ?? 0),
            Number(row.rolled_rank3_count ?? 0),
            Number(row.rolled_rank4_count ?? 0)
        ];
        const rolledRankSum = rolledRankCounts[0] * 1 + rolledRankCounts[1] * 2 + rolledRankCounts[2] * 3 + rolledRankCounts[3] * 4;
        const rolledBest = row.rolled_best_raw_score ?? null;
        playerStats[userId].gameCount += rolledGameCount;
        playerStats[userId].totalPoints += rolledTotalPoints;
        playerStats[userId].rankSum += rolledRankSum;
        playerStats[userId].rankCounts[0] += rolledRankCounts[0];
        playerStats[userId].rankCounts[1] += rolledRankCounts[1];
        playerStats[userId].rankCounts[2] += rolledRankCounts[2];
        playerStats[userId].rankCounts[3] += rolledRankCounts[3];
        playerStats[userId].bestScore = playerStats[userId].bestScore === null ? rolledBest : rolledBest === null ? playerStats[userId].bestScore : Math.max(playerStats[userId].bestScore, rolledBest);
    });
    const seedPlayers = [];
    members?.forEach((member)=>{
        seedPlayers.push({
            id: member.user_id,
            name: member.profiles?.display_name || profileMap.get(member.user_id)?.name || "メンバー",
            avatarUrl: member.profiles?.avatar_url || profileMap.get(member.user_id)?.avatarUrl
        });
    });
    if (!members?.some((m)=>m.user_id === league.owner_id)) {
        seedPlayers.push({
            id: league.owner_id,
            name: ownerProfile?.display_name || profileMap.get(league.owner_id)?.name || "オーナー",
            avatarUrl: ownerProfile?.avatar_url || profileMap.get(league.owner_id)?.avatarUrl || null
        });
    }
    seedPlayers.forEach((p)=>{
        if (!playerStats[p.id]) {
            playerStats[p.id] = {
                odIndex: p.id,
                name: p.name,
                avatarUrl: p.avatarUrl,
                totalPoints: 0,
                gameCount: 0,
                rankSum: 0,
                rankCounts: [
                    0,
                    0,
                    0,
                    0
                ],
                bestScore: null
            };
        } else {
            playerStats[p.id].name = playerStats[p.id].name === "Unknown" ? p.name : playerStats[p.id].name;
            playerStats[p.id].avatarUrl = playerStats[p.id].avatarUrl ?? p.avatarUrl;
        }
    });
    const rankingAll = Object.values(playerStats);
    const rankingPlayed = rankingAll.filter((p)=>p.gameCount > 0).sort((a, b)=>b.totalPoints - a.totalPoints);
    const rankingUnplayed = rankingAll.filter((p)=>p.gameCount === 0).sort((a, b)=>a.name.localeCompare(b.name));
    const rankedWithLabels = addRankLabels(rankingPlayed, (player)=>player.totalPoints);
    const fullRanking = [
        ...rankedWithLabels,
        ...rankingUnplayed.map((player)=>({
                ...player,
                rankLabel: "—"
            }))
    ];
    const bestScoreCandidates = Object.values(playerStats).filter((p)=>p.gameCount > 0 && Number.isFinite(p.bestScore)).sort((a, b)=>(b.bestScore ?? -Infinity) - (a.bestScore ?? -Infinity));
    const bestScoreRanking = addRankLabels(bestScoreCandidates, (player)=>player.bestScore ?? -Infinity).filter((player)=>player.rankLabel <= 3);
    const avoidCandidates = Object.values(playerStats).filter((p)=>p.gameCount > 0).map((p)=>({
            ...p,
            avoidRate: p.gameCount > 0 ? 1 - p.rankCounts[3] / p.gameCount : null
        })).filter((p)=>Number.isFinite(p.avoidRate)).sort((a, b)=>b.avoidRate - a.avoidRate);
    const avoidRanking = addRankLabels(avoidCandidates, (player)=>player.avoidRate).filter((player)=>player.rankLabel <= 3);
    const rollupTotalsMap = new Map();
    (leagueRollups || []).forEach((row)=>{
        if (!row.user_id) return;
        rollupTotalsMap.set(row.user_id, Number(row.rolled_total_points ?? 0));
    });
    const chartPlayers = Object.values(playerStats).filter((p)=>p.gameCount > 0).sort((a, b)=>b.totalPoints - a.totalPoints);
    const chartColors = [
        "#10b981",
        "#f97316",
        "#3b82f6",
        "#8b5cf6",
        "#ef4444",
        "#14b8a6",
        "#eab308",
        "#6366f1",
        "#ec4899",
        "#22c55e"
    ];
    const gamesSorted = [
        ...games || []
    ].sort((a, b)=>{
        const aTime = new Date(a.played_at || a.created_at).getTime();
        const bTime = new Date(b.played_at || b.created_at).getTime();
        return aTime - bTime;
    });
    const perPlayerSeries = new Map();
    chartPlayers.forEach((player)=>{
        const base = rollupTotalsMap.get(player.odIndex) ?? 0;
        let total = base;
        const series = [];
        gamesSorted.forEach((game)=>{
            const result = (game.game_results || []).find((r)=>r.user_id === player.odIndex);
            if (!result) return;
            total += Number(result.point);
            series.push(Number(total.toFixed(1)));
        });
        perPlayerSeries.set(player.odIndex, series);
    });
    const maxSeriesLength = Math.max(0, ...Array.from(perPlayerSeries.values()).map((series)=>series.length));
    const pointsTimeline = Array.from({
        length: maxSeriesLength
    }, (_, index)=>{
        const entry = {
            game: index + 1
        };
        perPlayerSeries.forEach((series, playerId)=>{
            if (index < series.length) {
                entry[playerId] = series[index];
            }
        });
        return entry;
    });
    const memberIds = members?.map((m)=>m.user_id) || [];
    const existingMemberIds = Array.from(new Set([
        ...memberIds,
        league.owner_id
    ]));
    const isOwner = league.owner_id === user.id;
    const isMember = memberIds.includes(user.id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-20 md:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/leagues",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-foreground break-words",
                                                children: league.name
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 422,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground",
                                                children: league.game_type === "four_player" ? "四麻" : "三麻"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, this),
                                    league.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground text-sm mt-1",
                                        children: league.description
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end",
                        children: [
                            isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/leagues/${leagueId}/settings`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this),
                            isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$league$2d$member$2d$add$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LeagueMemberAdd"], {
                                leagueId: leagueId,
                                userId: user.id,
                                existingMemberIds: existingMemberIds
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 439,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/games/new?league=${leagueId}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    className: "gap-2 w-full sm:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this),
                                        "対局を記録"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "h-5 w-5 text-accent"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this),
                                "ランキング"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: fullRanking.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: fullRanking.map((player, index)=>{
                                const rankLabel = player.rankLabel;
                                const rankNumber = typeof rankLabel === "number" ? rankLabel : null;
                                const avgRank = player.gameCount > 0 ? player.rankSum / player.gameCount : null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between p-3 rounded-lg", rankNumber === 1 && "bg-accent/20", rankNumber === 2 && "bg-secondary/50", rankNumber === 3 && "bg-muted/50", (rankNumber === null || rankNumber > 3) && "border border-border"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", rankNumber === 1 && "bg-accent text-accent-foreground", rankNumber === 2 && "bg-secondary text-secondary-foreground", rankNumber === 3 && "bg-muted text-muted-foreground", (rankNumber === null || rankNumber > 3) && "bg-background text-foreground border border-border"),
                                                            children: rankLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-9 w-9",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: player.avatarUrl || undefined
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: player.name.charAt(0).toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: player.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: [
                                                                player.gameCount,
                                                                "戦 / 平均",
                                                                avgRank !== null ? `${avgRank.toFixed(2)}位` : "-"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("font-bold text-lg", player.totalPoints >= 0 ? "text-chart-1" : "text-destructive"),
                                                    children: [
                                                        player.totalPoints >= 0 ? "+" : "",
                                                        player.totalPoints.toFixed(1)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "pt"
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 500,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, player.odIndex, true, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 459,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-center py-4",
                            children: "まだ対局がありません"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 517,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "順位回数"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "overflow-x-auto",
                        children: fullRanking.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "text-muted-foreground border-b",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left py-2 font-medium",
                                                children: "プレイヤー"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-2 font-medium",
                                                children: "1位"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-2 font-medium",
                                                children: "2位"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-2 font-medium",
                                                children: "3位"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 534,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-center py-2 font-medium",
                                                children: "4位"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 530,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: fullRanking.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 pr-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                className: "h-7 w-7",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                        src: player.avatarUrl || undefined
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                        lineNumber: 544,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                        children: player.name.charAt(0).toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                        lineNumber: 545,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center tabular-nums",
                                                    children: player.rankCounts[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center tabular-nums",
                                                    children: player.rankCounts[1]
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center tabular-nums",
                                                    children: player.rankCounts[2]
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "text-center tabular-nums",
                                                    children: player.rankCounts[3]
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, player.odIndex, true, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 538,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 528,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-center py-4",
                            children: "まだ対局がありません"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 559,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "総合pt推移"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 566,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: chartPlayers.length > 0 && pointsTimeline.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[260px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: "100%",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                                    data: pointsTimeline,
                                    margin: {
                                        top: 8,
                                        right: 12,
                                        bottom: 8,
                                        left: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                            strokeDasharray: "3 3",
                                            stroke: "#e5e7eb",
                                            opacity: 0.5
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 573,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                            dataKey: "game",
                                            stroke: "#9ca3af",
                                            fontSize: 12,
                                            tickLine: false,
                                            axisLine: {
                                                stroke: "#e5e7eb"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 574,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                            width: 32,
                                            stroke: "#9ca3af",
                                            fontSize: 12,
                                            tickLine: false,
                                            axisLine: {
                                                stroke: "#e5e7eb"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 581,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            contentStyle: {
                                                backgroundColor: "#fff",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "8px"
                                            },
                                            labelFormatter: (value)=>`${value}戦目`,
                                            formatter: (value, name)=>[
                                                    `${value >= 0 ? "+" : ""}${value}pt`,
                                                    name
                                                ]
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                            wrapperStyle: {
                                                paddingTop: 8
                                            },
                                            content: ({ payload })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-3",
                                                    children: (payload || []).map((entry)=>{
                                                        const id = entry.dataKey;
                                                        const isSelected = selectedPlayerId === id;
                                                        const isDimmed = selectedPlayerId && !isSelected;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setSelectedPlayerId(isSelected ? null : id),
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1 text-xs font-semibold transition-opacity", isDimmed && "opacity-40"),
                                                            style: {
                                                                color: entry.color
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-block h-2.5 w-2.5 rounded-full border",
                                                                    style: {
                                                                        borderColor: entry.color
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                    lineNumber: 616,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                entry.value
                                                            ]
                                                        }, id, true, {
                                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 29
                                                        }, void 0);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 600,
                                                    columnNumber: 23
                                                }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                            lineNumber: 597,
                                            columnNumber: 19
                                        }, this),
                                        chartPlayers.map((player, index)=>(()=>{
                                                const isSelected = selectedPlayerId === player.odIndex;
                                                const isDimmed = selectedPlayerId && !isSelected;
                                                const stroke = chartColors[index % chartColors.length];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                                    type: "linear",
                                                    dataKey: player.odIndex,
                                                    name: player.name,
                                                    stroke: stroke,
                                                    strokeWidth: isSelected ? 3 : 2,
                                                    dot: false,
                                                    strokeOpacity: isDimmed ? 0.2 : 1,
                                                    connectNulls: true
                                                }, player.odIndex, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 21
                                                }, this);
                                            })())
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 571,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 570,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-center py-4",
                            children: "まだ対局がありません"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 648,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 564,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg",
                                    children: "最高スコア TOP3"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 656,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 655,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pt-0 space-y-2",
                                children: bestScoreRanking.length > 0 ? bestScoreRanking.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between rounded-lg border border-border/70 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-muted-foreground",
                                                        children: [
                                                            "#",
                                                            player.rankLabel
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 666,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                        className: "h-8 w-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                src: player.avatarUrl || undefined
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                children: player.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-sm",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 672,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: [
                                                                    player.gameCount,
                                                                    "戦"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 673,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 665,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base font-bold text-emerald-600",
                                                children: Number.isFinite(player.bestScore) ? `${player.bestScore.toLocaleString()}点` : "-"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 676,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, player.odIndex, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 661,
                                        columnNumber: 17
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "まだスコアがありません"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 682,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 658,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 654,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg",
                                    children: "4着回避率 TOP3"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 689,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 688,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pt-0 space-y-2",
                                children: avoidRanking.length > 0 ? avoidRanking.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between rounded-lg border border-border/70 px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-muted-foreground",
                                                        children: [
                                                            "#",
                                                            player.rankLabel
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 699,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                        className: "h-8 w-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                src: player.avatarUrl || undefined
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                children: player.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 702,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-sm",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 705,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: [
                                                                    player.gameCount,
                                                                    "戦"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 706,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 704,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 698,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base font-bold text-blue-600",
                                                children: Number.isFinite(player.avoidRate) ? `${(player.avoidRate * 100).toFixed(1)}%` : "-"
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 709,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, player.odIndex, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 694,
                                        columnNumber: 17
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "まだ対局がありません"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 715,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                lineNumber: 691,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 687,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 653,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "対局履歴"
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 723,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 722,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: games && games.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: games.map((game)=>{
                                const sortedResults = [
                                    ...game.game_results || []
                                ].sort((a, b)=>a.rank - b.rank);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/games/${game.id}`,
                                    className: "block",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: new Date(game.played_at).toLocaleDateString("ja-JP")
                                                }, void 0, false, {
                                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 733,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-4 gap-2",
                                                children: sortedResults.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                        className: "h-10 w-10",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                                src: result.profiles?.avatar_url || undefined
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                                lineNumber: 743,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                                children: (result.player_name || result.profiles?.display_name || "?").charAt(0).toUpperCase()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                                lineNumber: 744,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                        lineNumber: 742,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-muted-foreground",
                                                                        children: [
                                                                            result.rank,
                                                                            "位"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                        lineNumber: 750,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm font-medium truncate w-full",
                                                                        title: result.player_name || result.profiles?.display_name || "Unknown",
                                                                        children: result.player_name || result.profiles?.display_name || "Unknown"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                        lineNumber: 751,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 741,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xs", Number(result.point) >= 0 ? "text-chart-1" : "text-destructive"),
                                                                children: [
                                                                    Number(result.point) >= 0 ? "+" : "",
                                                                    Number(result.point).toFixed(1)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                                lineNumber: 758,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, result.id, true, {
                                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                        lineNumber: 740,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                                lineNumber: 738,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 732,
                                        columnNumber: 21
                                    }, this)
                                }, game.id, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 731,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 727,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground mb-4",
                                    children: "まだ対局がありません"
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 774,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/games/new?league=${leagueId}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        children: "最初の対局を記録"
                                    }, void 0, false, {
                                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                        lineNumber: 776,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                                    lineNumber: 775,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                            lineNumber: 773,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
                lineNumber: 721,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/(authenticated)/leagues/[id]/page.tsx",
        lineNumber: 412,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=insane_workspace_playground_v0-mahjong-score-tracker_67c5d6b7._.js.map