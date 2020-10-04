import React from "react";

class ConversionResultCard extends React.Component {
    render() {
        return (
            <div className="m-6">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div>
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                    {this.props.resultData.query.from} {this.props.resultData.query.amount}  =
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                        <span className="text-3xl">
                                            {this.props.resultData.query.to} {this.props.resultData.result}
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pt-2 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    1 {this.props.resultData.query.from} = {this.props.resultData.query.to} {this.props.resultData.info.rate}
                                </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConversionResultCard