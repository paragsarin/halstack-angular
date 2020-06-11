import { render, fireEvent } from '@testing-library/angular';
import { DxcResultTable } from './table';
import { CdkTableModule } from './table-module';

describe('DxcResultset Table tests', () => {
  test('should render dxc-resultset-table', async () => {
    const { getByText } = await render(DxcResultTable, {
        template:`  <dxc-resultset-table [collectionResource]="[{user:'user1',email:'user1@gmail.com'}]" [margin]="xxsmall">
                        <ng-container dxcColumnDef="user">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    expect(getByText("user1")).toBeTruthy();
  });

  test('should show data from next page', async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="2">
                        <ng-container dxcColumnDef="user">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    expect(table.getByText("pepe")).toBeTruthy();
    const nextButton = table.getAllByRole("button")[2];
    fireEvent.click(nextButton);
    table.detectChanges();
    expect(table.getByText("3 to 4 of 4")).toBeTruthy();
    expect(table.getByText("Page: 2 of 2")).toBeTruthy();
    expect(table.getByText("user5")).toBeTruthy();
    expect(table.getByText("aida")).toBeTruthy();
  });

  test("should show data from last page", async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="1">
                        <ng-container dxcColumnDef="user">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    const lastButton = table.getAllByRole("button")[3];
    fireEvent.click(lastButton);
    table.detectChanges();
    expect(table.getByText("4 to 4 of 4")).toBeTruthy();
    expect(table.getByText("Page: 4 of 4")).toBeTruthy();
    expect(table.getByText("aida")).toBeTruthy();
  });

  test("should show data from previous page", async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="1">
                        <ng-container dxcColumnDef="user">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    const lastButton = table.getAllByRole("button")[3];
    fireEvent.click(lastButton);
    table.detectChanges();
    expect(table.getByText("4 to 4 of 4")).toBeTruthy();
    expect(table.getByText("Page: 4 of 4")).toBeTruthy();
    expect(table.getByText("aida")).toBeTruthy();
    const previousButton = table.getAllByRole("button")[1];
    fireEvent.click(previousButton);
    table.detectChanges();
    expect(table.getByText("3 to 3 of 4")).toBeTruthy();
    expect(table.getByText("Page: 3 of 4")).toBeTruthy();
    expect(table.getByText("user5")).toBeTruthy();
  });

  test("should show data from first page", async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="1">
                        <ng-container dxcColumnDef="user">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    const lastButton = table.getAllByRole("button")[3];
    fireEvent.click(lastButton);
    table.detectChanges();
    expect(table.getByText("4 to 4 of 4")).toBeTruthy();
    expect(table.getByText("Page: 4 of 4")).toBeTruthy();
    expect(table.getByText("aida")).toBeTruthy();
    const firstButton = table.getAllByRole("button")[0];
    fireEvent.click(firstButton);
    table.detectChanges();
    expect(table.getByText("1 to 1 of 4")).toBeTruthy();
    expect(table.getByText("Page: 1 of 4")).toBeTruthy();
    expect(table.getByText("user1")).toBeTruthy();
  });

  test("should sort data by column", async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="2">
                        <ng-container dxcColumnDef="user" isSortable="true">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    expect(table.getByText("pepe")).toBeTruthy();
    const sortHeader = table.getByText("user");
    fireEvent.click(sortHeader);
    table.detectChanges();
    expect(table.getByText("aida")).toBeTruthy();
    expect(table.getByText("pepe")).toBeTruthy();
    const nextButton = table.getAllByRole("button")[2];
    fireEvent.click(nextButton);
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    expect(table.getByText("user5")).toBeTruthy();
  });

  test("should not sort data that is not sortable", async () => {
    const table = await render(DxcResultTable, {
        template:`  <dxc-resultset-table 
                    [collectionResource]="[
                        {user:'user1',email:'user1@gmail.com'},
                        {user:'pepe',email:'user2@gmail.com'},
                        {user:'user5',email:'user5@gmail.com'},
                        {user:'aida',email:'test@gmail.com'}
                    ]" 
                    [itemsPerPage]="2">
                        <ng-container dxcColumnDef="user" isSortable="true">
                            <td *dxcCellDef="let item">
                                {{item['user']}}
                            </td>
                        </ng-container>
                        <ng-container dxcColumnDef="email" isSortable="false">
                            <td *dxcCellDef="let item">
                                {{item['email']}}
                            </td>
                        </ng-container>
                    </dxc-resultset-table>`,
       imports: [CdkTableModule],
       excludeComponentDeclaration: true
    })
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    expect(table.getByText("pepe")).toBeTruthy();
    const sortHeader = table.getByText("email");
    fireEvent.click(sortHeader);
    table.detectChanges();
    expect(table.getByText("user1")).toBeTruthy();
    expect(table.getByText("pepe")).toBeTruthy();
  });

});