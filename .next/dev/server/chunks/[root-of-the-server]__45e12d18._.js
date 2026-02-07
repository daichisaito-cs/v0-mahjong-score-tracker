module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$88$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@supabase+supabase-js@2.88.0/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
let adminClient = null;
function createAdminClient() {
    if (adminClient) {
        return adminClient;
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
    }
    adminClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$88$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://htqvvvhezcjjhloncozs.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
    return adminClient;
}
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$88$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.88.0/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$88$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.88.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$88$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://htqvvvhezcjjhloncozs.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cXZ2dmhlemNqamhsb25jb3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NjI5MzAsImV4cCI6MjA4MTUzODkzMH0.uBr4L9t4O7DYrPo4wCPKY56QMt3Ct0VSeOqNP_80RFI"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Server Component context - ignore
                }
            }
        }
    });
}
}),
"[project]/insane/workspace/playground/v0-mahjong-score-tracker/app/api/account-delete/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/insane/workspace/playground/v0-mahjong-score-tracker/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
;
function uniqueIds(ids) {
    return Array.from(new Set(ids.filter((id)=>Boolean(id))));
}
async function POST() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ログインが必要です"
            }, {
                status: 401
            });
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: ownedLeagues, error: ownedLeaguesError } = await admin.from("leagues").select("id").eq("owner_id", user.id);
        if (ownedLeaguesError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "リーグ情報の取得に失敗しました"
            }, {
                status: 500
            });
        }
        const leagueIds = uniqueIds(ownedLeagues?.map((l)=>l.id) ?? []);
        const { data: gamesByOwner, error: gamesByOwnerError } = await admin.from("games").select("id").eq("created_by", user.id);
        if (gamesByOwnerError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "対局情報の取得に失敗しました"
            }, {
                status: 500
            });
        }
        let gamesByLeague = [];
        if (leagueIds.length > 0) {
            const { data, error: gamesByLeagueError } = await admin.from("games").select("id").in("league_id", leagueIds);
            if (gamesByLeagueError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "対局情報の取得に失敗しました"
                }, {
                    status: 500
                });
            }
            gamesByLeague = data || [];
        }
        const gameIds = uniqueIds([
            ...gamesByOwner?.map((g)=>g.id) ?? [],
            ...gamesByLeague?.map((g)=>g.id) ?? []
        ]);
        if (gameIds.length > 0) {
            const { error: deleteGameResultsError } = await admin.from("game_results").delete().in("game_id", gameIds);
            if (deleteGameResultsError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "対局結果の削除に失敗しました"
                }, {
                    status: 500
                });
            }
        }
        const { error: anonymizeError } = await admin.from("game_results").update({
            user_id: null,
            player_name: "退会ユーザー"
        }).eq("user_id", user.id);
        if (anonymizeError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "対局結果の更新に失敗しました"
            }, {
                status: 500
            });
        }
        if (gameIds.length > 0) {
            const { error: deleteGamesError } = await admin.from("games").delete().in("id", gameIds);
            if (deleteGamesError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "対局の削除に失敗しました"
                }, {
                    status: 500
                });
            }
        }
        if (leagueIds.length > 0) {
            const { error: deleteLeagueMembersError } = await admin.from("league_members").delete().in("league_id", leagueIds);
            if (deleteLeagueMembersError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "リーグ参加情報の削除に失敗しました"
                }, {
                    status: 500
                });
            }
        }
        const { error: deleteMyMembershipsError } = await admin.from("league_members").delete().eq("user_id", user.id);
        if (deleteMyMembershipsError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "リーグ参加情報の削除に失敗しました"
            }, {
                status: 500
            });
        }
        if (leagueIds.length > 0) {
            const { error: deleteLeaguesError } = await admin.from("leagues").delete().in("id", leagueIds);
            if (deleteLeaguesError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "リーグの削除に失敗しました"
                }, {
                    status: 500
                });
            }
        }
        const { error: deleteFriendshipsError } = await admin.from("friendships").delete().or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);
        if (deleteFriendshipsError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "フレンド情報の削除に失敗しました"
            }, {
                status: 500
            });
        }
        const { error: deleteRulesError } = await admin.from("rules").delete().eq("created_by", user.id);
        if (deleteRulesError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ルールの削除に失敗しました"
            }, {
                status: 500
            });
        }
        const { error: deleteProfileError } = await admin.from("profiles").delete().eq("id", user.id);
        if (deleteProfileError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "プロフィールの削除に失敗しました"
            }, {
                status: 500
            });
        }
        const { error: deleteUserError } = await admin.auth.admin.deleteUser(user.id);
        if (deleteUserError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "アカウントの削除に失敗しました"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "アカウントを削除しました"
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$insane$2f$workspace$2f$playground$2f$v0$2d$mahjong$2d$score$2d$tracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "アカウントの削除に失敗しました"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45e12d18._.js.map