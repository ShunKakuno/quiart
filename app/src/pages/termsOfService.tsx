import { PageLayout } from "@/pageLayout"
import "@/css/terms.css"

export function TermsOfService() {
  return (
    <PageLayout>
      <div className="terms-container">
        <h1 className="terms-title">利用規約</h1>

        <p className="terms-text">
          本利用規約（以下「本規約」といいます。）は、当アプリケーション（以下「本サービス」といいます。）の
          利用条件を定めるものです。ユーザーの皆さま（以下「ユーザー」といいます。）には、
          本規約に同意のうえ、本サービスをご利用いただきます。
        </p>

        <section className="terms-section">
          <h2>第1条（適用）</h2>
          <p>
            本規約は、ユーザーと本サービス運営者（以下「運営者」といいます。）との間の
            本サービスの利用に関わる一切の関係に適用されます。
          </p>
        </section>

        <section className="terms-section">
          <h2>第2条（利用登録）</h2>
          <p>
            本サービスは、特別な登録を必要とせず利用できる場合がありますが、
            一部機能についてはログインまたはユーザー識別情報の保存を行う場合があります。
          </p>
        </section>

        <section className="terms-section">
          <h2>第3条（禁止事項）</h2>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>不正アクセス、またはこれを試みる行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者に不利益・損害・不快感を与える行為</li>
            <li>本サービスの内容を無断で複製、転載、改変する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>第4条（サービス内容の変更・停止）</h2>
          <p>
            運営者は、ユーザーへの事前の通知なく、
            本サービスの内容を変更、追加、または停止することができます。
          </p>
        </section>

        <section className="terms-section">
          <h2>第5条（知的財産権）</h2>
          <p>
            本サービス内の文章、画像、プログラム、クイズデータ等に関する著作権および
            その他の知的財産権は、運営者または正当な権利者に帰属します。
          </p>
        </section>

        <section className="terms-section">
          <h2>第6条（免責事項）</h2>
          <ol>
            <li>本サービスの内容の正確性、完全性、有用性について保証するものではありません。</li>
            <li>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</li>
            <li>システム障害、通信環境、メンテナンス等により利用できない場合があります。</li>
          </ol>
        </section>

        <section className="terms-section">
          <h2>第7条（個人情報の取扱い）</h2>
          <p>
            本サービスにおけるユーザー情報の取扱いについては、
            別途定める「プライバシーポリシー」に従うものとします。
          </p>
        </section>

        <section className="terms-section">
          <h2>第8条（規約の変更）</h2>
          <p>
            運営者は、必要と判断した場合には、ユーザーに通知することなく
            本規約を変更することができます。
          </p>
        </section>

        <section className="terms-section">
          <h2>第9条（準拠法・管轄）</h2>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して生じた紛争については、
            運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>
      </div>
    </PageLayout>
  )
}
