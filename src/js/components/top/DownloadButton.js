import React from "react";

export default class DownloadButton extends React.Component{
    downloadFunction(){
        var url = "/ajax/result?";

        // 出力ファイルの作成ができるようになったら削除＆置き換え
        const filename = "sample.doc"
        url += "filename=" + filename
        if(confirm("まだファイルの出力は未完成だよ！\n変わりにアンケートの対象学年を出力したファイルを送信するけど大丈夫？")){
            const downloadButton = document.createElement("a");
            downloadButton.setAttribute("href", url);
            downloadButton.click();
            downloadButton.remove();
        }
        
    }
    render(){
        return(
            <a className="btn btn-outline-secondary" type="button" onClick={this.downloadFunction.bind(this)}>
                取得
            </a>
        )
    }
}