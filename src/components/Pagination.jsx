import React from 'react';
import { Input, Button } from "reactstrap";


const pageSize = [10, 20, 30, 40, 50];

const Pagination = ({ options: { limit = 10, page = 1, totalCount = 50 }, onChange }) => {
    const totalPage = parseInt(totalCount / limit) + (parseInt(totalCount % limit) > 0),
        disableNext = page === totalPage,
        disablePrevious = page === 1;
    return (
        <tr>
            <td>
                <Input
                    type="select"
                    name="pageSize"
                    value={limit}
                    onChange={({ currentTarget: { value } }) => {
                        onChange({ limit: parseInt(value), page:1 });
                    }}
                >
                    {pageSize.map((v, i) => (
                        <option key={i} value={v}>{v}</option>
                    ))}
                </Input></td>
            <td>{page} / {totalPage}</td>
            <td>
                <Button color="primary"
                    disabled={disablePrevious}
                    onClick={(e => { onChange({ page: 1 }) })}>{"<<"}</Button>
                <Button
                    disabled={disablePrevious}
                    onClick={e => onChange({ page: page - 1 })}>{"<"}</Button>
            </td>
            <td>
                <Button
                    disabled={disableNext}
                    onClick={e => onChange({ page: page + 1 })}
                >{">"} </Button>
                <Button color="primary"
                    disabled={disableNext}
                    onClick={(e => { onChange({ page: totalPage }) })}>{">>"}</Button></td>
            <td></td>
        </tr >
    )
}
export default Pagination;