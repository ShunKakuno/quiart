import { PageLayout } from "@/pageLayout"
import "@/css/privacyPolicy.css"

export function PrivacyPolicy() {
  return (
    <PageLayout>
        <div className="privacy-container">
        <h1 className="privacy-title">プライバシーポリシー</h1>

        <p className="privacy-text">
            本サービスでは、ユーザーの個人情報を適切に取り扱うことを重要と考え、
            以下のとおりプライバシーポリシーを定めます。
        </p>

        <section className="privacy-section">
            <h2>1. 取得する情報</h2>
            <p>
            本サービスでは、ユーザー登録を行わない場合でも、
            サービスの提供および品質向上のため、以下の情報を自動的に取得することがあります。
            </p>
            <ul>
            <li>IPアドレス</li>
            <li>ブラウザの種類、OS、端末情報</li>
            <li>アクセス日時、閲覧したページ</li>
            </ul>
        </section>

        <section className="privacy-section">
            <h2>2. 利用目的</h2>
            <p>取得した情報は、以下の目的で利用します。</p>
            <ul>
            <li>本サービスの提供、維持、改善</li>
            <li>不正利用の防止</li>
            <li>利用状況の分析</li>
            </ul>
        </section>

        <section className="privacy-section">
            <h2>3. 第三者提供</h2>
            <p>
            取得した情報を、法令に基づく場合を除き、
            第三者に提供することはありません。
            </p>
        </section>

        <section className="privacy-section">
            <h2>4. アクセス解析ツールについて</h2>
            <p>
            本サービスでは、サービス改善のため、
            アクセス解析ツールを使用する場合があります。
            これにより収集される情報は、各ツールのプライバシーポリシーに基づいて管理されます。
            </p>
        </section>

        <section className="privacy-section">
            <h2>5. プライバシーポリシーの変更</h2>
            <p>
            本ポリシーの内容は、必要に応じて変更することがあります。
            変更後の内容は、本サービス上に掲載した時点で効力を生じるものとします。
            </p>
        </section>

        <section className="privacy-section">
            <h2>6. お問い合わせ</h2>
            <p>
            本ポリシーに関するお問い合わせは、運営者までご連絡ください。
            </p>
        </section>
        </div>
    </PageLayout>
  )
}
